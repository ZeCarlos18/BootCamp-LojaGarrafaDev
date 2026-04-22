import { useLoaderData } from "react-router";

export async function loader({ context }: any) {
  // Pegando as chaves oficiais da sua loja BootCamp-Jose
  const SHOPIFY_URL = context.env.PUBLIC_STORE_DOMAIN;
  const SHOPIFY_TOKEN = context.env.PUBLIC_STOREFRONT_API_TOKEN;

  const [magentoRes, aemRes, shopifyRes] = await Promise.allSettled([
    fetch('http://127.0.0.1/rest/V1/bootcamp/product/garrafa-dev-01'), 
    
    // O SEGREDO AQUI: 127.0.0.1 em vez de localhost
    fetch('http://127.0.0.1:4502/graphql/execute.json/bootcamp/product-list'),
    
    // Conexão REAL com a sua conta da Shopify
    fetch(`https://${SHOPIFY_URL}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
      },
      body: JSON.stringify({ query: '{ shop { name } }' })
    })
  ]);

  const status = {
    magento: magentoRes.status === 'fulfilled' ? 'Online' : 'Offline / Erro de Rede',
    aem: aemRes.status === 'fulfilled' ? 'Online' : 'Offline / Erro de Rede',
    shopify: shopifyRes.status === 'fulfilled' ? 'Online' : 'Offline'
  };

  return { status };
}

export default function Dashboard() {
  const { status } = useLoaderData<any>();

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">System Dashboard</h1>
        <p className="text-gray-500 mb-8 font-medium">Monitoramento da Arquitetura Composable</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Adobe Commerce */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Adobe Commerce</h2>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Backend / PIM</p>
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${status.magento === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="font-bold text-gray-700">{status.magento}</span>
            </div>
          </div>

          {/* Card AEM */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Adobe Experience Manager</h2>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Headless CMS</p>
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${status.aem === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="font-bold text-gray-700">{status.aem}</span>
            </div>
          </div>

          {/* Card Shopify */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Shopify Storefront</h2>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">Checkout API</p>
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${status.shopify === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="font-bold text-gray-700">{status.shopify}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}