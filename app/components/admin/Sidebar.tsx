import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/users">Users</Link>
      </nav>
    </aside>
  );
}