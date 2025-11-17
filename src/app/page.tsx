export default function HomePage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to Movies App 🍿</h1>
      <p className="text-gray-600">You are successfully authenticated with Keycloak.</p>
      <p className="mt-4">Visit /dashboard to view movie list.</p>
    </div>
  );
}
