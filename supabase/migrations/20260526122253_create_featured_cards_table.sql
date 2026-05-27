-- Create or replace the function for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create featured_cards table
CREATE TABLE IF NOT EXISTS featured_cards (
    id BIGSERIAL PRIMARY KEY,
    badge TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_featured_cards_display_order ON featured_cards(display_order);
CREATE INDEX IF NOT EXISTS idx_featured_cards_is_active ON featured_cards(is_active);

-- Enable RLS
ALTER TABLE featured_cards ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON featured_cards
    FOR SELECT USING (true);

-- Allow authenticated users (admin) full control
CREATE POLICY "Allow authenticated users full access" ON featured_cards
    FOR ALL USING (auth.role() = 'authenticated');

-- Auto-update updated_at trigger
CREATE TRIGGER trigger_featured_cards_updated_at
    BEFORE UPDATE ON featured_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO featured_cards (badge, title, description, display_order) VALUES
    ('DL', 'DigiLocker', 'Gov-scale infra APIs', 1),
    ('UM', 'UMANG', 'Citizen platform APIs', 2),
    ('OA', 'Online Gaming', 'Regulatory authority', 3),
    ('ZT', 'Zero Trust', 'Security architecture', 4),
    ('CI', 'CI/CD', 'Pipeline automation', 5);