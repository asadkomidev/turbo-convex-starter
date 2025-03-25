import { HomeScreen } from "@/features/marketing/screens/home-screen";
import { getProducts } from "@/actions/products";

export default async function Page() {
  const data = await getProducts();

  return <HomeScreen result={data as any} />;
}
