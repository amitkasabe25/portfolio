// app/api/resume/refine-summary/route.ts
// POST { summary: string } → { refinedSummary: string }

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const runtime = 'nodejs'; // optional, but safe
export const maxDuration = 30;   // NVIDIA API might take a few seconds

export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate input
    let body: { summary?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { summary } = body;
    if (!summary || typeof summary !== 'string' || summary.trim().length === 0) {
      return NextResponse.json(
        { error: 'Summary is required and cannot be empty.' },
        { status: 400 }
      );
    }

    // 2. Get API key from environment
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'NVIDIA_API_KEY is not set in environment variables.' },
        { status: 500 }
      );
    }

    // 3. Call NVIDIA API
    const response = await axios.post(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: 'qwen/qwen3.5-397b-a17b',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume writer. Refine the given professional summary to be more impactful, concise, and ATS-friendly. Keep the same key information but improve grammar, style, and action verbs. Return ONLY the refined summary, no quotes or extra text.`,
          },
          {
            role: 'user',
            content: `Original summary:\n${summary.trim()}\n\nRefined summary:`,
          },
        ],
        max_tokens: 1024,
        temperature: 0.6,
        top_p: 0.95,
        top_k: 20,
        presence_penalty: 0,
        repetition_penalty: 1,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const refinedSummary = response.data?.choices?.[0]?.message?.content?.trim();
    if (!refinedSummary) {
      throw new Error('Invalid response from NVIDIA API');
    }

    return NextResponse.json({ refinedSummary });
  } catch (error: any) {
    console.error('[refine-summary]', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.error?.message || error.message;
      return NextResponse.json(
        { error: `NVIDIA API error: ${message}` },
        { status }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}