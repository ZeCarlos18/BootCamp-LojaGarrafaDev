import { useLoaderData } from "react-router";

export async function loader() {
  try {
    const response = await fetch(
      'http://127.0.0.1:4502/graphql/execute.json/bootcamp/product-list',
      {
        headers: {
          'Authorization': 'Basic YWRtaW46YWRtaW4='
        }
      }
    );

    if (!response.ok) {
      throw new Error(`AEM respondeu com status ${response.status}`);
    }

    const result = (await response.json()) as any;
    const produtos = result.data?.productList?.items || [];

    return { produtos, error: null };
  } catch (error) {
    console.error("Erro ao buscar dados do AEM:", error);
    return { produtos: [], error: String(error) };
  }
}

export default function About() {
  const { produtos, error } = useLoaderData<any>();

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
            Sobre o Projeto
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Produtos em destaque — dados via AEM GraphQL
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">
            <p className="font-bold text-sm">⚠️ Erro ao conectar com o AEM</p>
            <p className="text-xs mt-1">{error}</p>
            <p className="text-xs mt-1">Verifique se o AEM está rodando em <code>localhost:4502</code></p>
          </div>
        )}

        {!error && produtos.length === 0 && (
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl border border-yellow-200 mb-6">
            <p className="font-bold text-sm">Nenhum produto encontrado no AEM.</p>
            <p className="text-xs mt-1">Verifique se os Content Fragments estão publicados.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((p: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
            >
              {p.productImage?._authorUrl && (
                <img
                  src={p.productImage._authorUrl}
                  alt={p.productName}
                  className="w-full h-40 object-cover bg-gray-100"
                />
              )}
              {!p.productImage?._authorUrl && (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 text-4xl">📦</span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-base font-bold text-gray-900 leading-tight">
                      {p.productName}
                    </h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                      {p.sku}
                    </p>
                  </div>
                  <span className="text-blue-600 font-black text-lg">
                    R$ {p.price}
                  </span>
                </div>

                {p.techStack && (
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
                      Tech Stack:
                    </span>
                    <span className="text-blue-900 font-semibold text-xs">
                      {p.techStack}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${produtos.length > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            {produtos.length > 0
              ? `${produtos.length} produtos carregados do AEM`
              : 'Sem dados do AEM'}
          </p>
        </div>

      </div>
    </div>
  );
}