import { useLoaderData } from "react-router";

export async function loader({ context }: any) {
  const SHOPIFY_URL = context.env.PUBLIC_STORE_DOMAIN;
  const SHOPIFY_TOKEN = context.env.PUBLIC_STOREFRONT_API_TOKEN;

  const MAGENTO_ACCESS_TOKEN = "eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEsInV0eXBpZCI6MiwiaWF0IjoxNzc2OTEwMDQxLCJleHAiOjE3NzY5MTM2NDF9.18MnZeBjUVM5Fe1Q2-KAE5f6xEGFjSZy-bXeSI4It1w";

  const [magentoRes, aemRes, shopifyRes] = await Promise.allSettled([
    fetch('https://127.0.0.1/rest/V1/products?searchCriteria[pageSize]=0', {
      headers: {
        'Authorization': `Bearer ${MAGENTO_ACCESS_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'magento2.docker'
      }
    }),
    fetch('http://127.0.0.1:4502/graphql/execute.json/bootcamp/product-list', {
      headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }
    }),
    fetch(`https://${SHOPIFY_URL}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
      },
      body: JSON.stringify({ query: '{ products(first: 250) { edges { node { id } } } }' })
    })
  ]);

  const processAPI = async (res: any, apiType: string) => {
    if (res.status === 'rejected') {
      return { state: 'Erro de Rede', count: 0 };
    }
    if (!res.value.ok) {
      return { state: `Erro HTTP ${res.value.status}`, count: 0 };
    }
    try {
      const json = await res.value.json();
      let count = 0;
      if (apiType === 'magento') count = json.total_count || 0;
      if (apiType === 'aem') count = json.data?.productList?.items?.length || 0;
      if (apiType === 'shopify') count = json.data?.products?.edges?.length || 0;
      return { state: 'Online', count };
    } catch (e) {
      return { state: 'Erro de JSON', count: 0 };
    }
  };

  return {
    status: {
      magento: await processAPI(magentoRes, 'magento'),
      aem: await processAPI(aemRes, 'aem'),
      shopify: await processAPI(shopifyRes, 'shopify')
    }
  };
}

export default function Dashboard() {
  const { status } = useLoaderData<any>();

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
          System Dashboard
        </h1>
        <p className="text-gray-500 mb-8 font-medium">
          Monitoramento do Ecossistema Composable
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Adobe Commerce", info: status.magento },
            { name: "Adobe Experience Manager", info: status.aem },
            { name: "Shopify Storefront", info: status.shopify }
          ].map((plat) => (
            <div
              key={plat.name}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800 leading-tight mb-4">
                  {plat.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${plat.info.state === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="font-bold text-gray-700 text-sm">{plat.info.state}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 mt-4">
                <span className="text-3xl font-black text-blue-600">{plat.info.count}</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Itens Indexados</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}