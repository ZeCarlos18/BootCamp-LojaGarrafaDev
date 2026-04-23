import { useLoaderData } from "react-router";

export async function loader() {
  try {
    // Chamada real para o AEM via GraphQL com cabeçalho de Autenticação (admin:admin)
    const response = await fetch('http://127.0.0.1:4502/graphql/execute.json/bootcamp/product-list', {
      headers: {
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      }
    });
    
    if (!response.ok) {
      throw new Error(`Falha na conexão com AEM: Status ${response.status}`);
    }

    // O "as any" evita que o TypeScript bloqueie a leitura das propriedades do JSON
    const result = (await response.json()) as any;
    
    // Pegamos o primeiro item da lista de Content Fragments do AEM
const itemAEM = result.data.productList.items[0];

    return { 
      produto: {
        name: itemAEM.productName,
        sku: itemAEM.sku,
        price: itemAEM.price,
        // O ponto de interrogação protege contra erro se não houver imagem, 
        // e o || coloca uma imagem de garrafa padrão se vier vazio
        image: itemAEM.productImage?._authorUrl || "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop", 
        techStack: itemAEM.techStack
      },
      isMock: false 
    };
  } catch (error) {
    console.error("Erro na integração End-to-End com AEM:", error);
    // Fallback caso o AEM não responda ou a rota não exista ainda
    return { produto: null, isMock: true };
  }
}

export default function Homepage() {
  const { produto, isMock } = useLoaderData<any>();

  // Se a API falhar, mostramos uma tela de alerta em vez de quebrar a aplicação
  if (!produto && isMock) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10 font-sans">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200 text-center shadow-sm max-w-sm">
          <h2 className="font-bold text-lg mb-2">Conexão Perdida com o AEM</h2>
          <p className="text-sm">Por favor, inicie o servidor em <code>localhost:4502</code> e garanta que a Persisted Query <strong>bootcamp/product-list</strong> está salva.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
          Dev Store <span className="text-blue-600">Headless</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm">Projeto Final - Adobe Bootcamp</p>
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm w-full border border-gray-200">
        <div className="relative h-80 bg-gray-200">
          <img 
            src={produto.image} 
            alt={produto.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md">
            Produção
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{produto.name}</h2>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{produto.sku}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-600">R$ {produto.price}</span>
            </div>
          </div>

          <div className="my-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-1">
              Atributo AEM (Tech Stack):
            </span>
            <p className="text-blue-900 font-semibold text-sm">{produto.techStack}</p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
            Comprar Agora
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          Integração End-to-End Ativa
        </p>
      </div>
    </div>
  );
}