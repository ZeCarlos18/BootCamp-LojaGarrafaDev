import { useLoaderData } from "react-router";
import { Link } from "react-router";

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
      throw new Error(`Falha na conexão com AEM: Status ${response.status}`);
    }

    const result = (await response.json()) as any;
    const items = result.data.productList.items;

    const produtos = items.map((item: any) => ({
      name: item.productName,
      sku: item.sku,
      price: item.price,
      image: item.productImage?._authorUrl ||
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
      techStack: item.techStack
    }));

    return { produtos, isMock: false };
  } catch (error) {
    console.error("Erro na integração com AEM:", error);
    return { produtos: [], isMock: true };
  }
}

export default function Homepage() {
  const { produtos, isMock } = useLoaderData<any>();

  if (isMock || produtos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10 font-sans">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center shadow-sm max-w-sm">
          <h2 className="font-bold text-lg mb-2">Conexão Perdida com o AEM</h2>
          <p className="text-sm">
            Por favor, inicie o servidor em{" "}
            <code>localhost:4502</code> e garanta que a Persisted Query{" "}
            <strong>bootcamp/product-list</strong> está salva.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
            Dev Store <span className="text-blue-600">Headless</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Projeto Final - Adobe Bootcamp
          </p>

          {/* Botões de navegação */}
          <div className="flex justify-center gap-3 mt-5">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <span>📋</span> Sobre o Projeto
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
            >
              <span>📊</span> System Dashboard
            </Link>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 flex flex-col"
            >
              <div className="relative h-56 bg-gray-200">
                <img
                  src={produto.image}
                  alt={produto.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md">
                  Produção
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 leading-tight">
                      {produto.name}
                    </h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      {produto.sku}
                    </p>
                  </div>
                  <span className="text-xl font-black text-blue-600">
                    R$ {produto.price}
                  </span>
                </div>

                {produto.techStack && (
                  <div className="my-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-0.5">
                      Tech Stack:
                    </span>
                    <p className="text-blue-900 font-semibold text-xs">
                      {produto.techStack}
                    </p>
                  </div>
                )}

                <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm">
                  Comprar Agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé de status */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            Integração End-to-End Ativa — {produtos.length} produtos do AEM
          </p>
        </div>

      </div>
    </div>
  );
}