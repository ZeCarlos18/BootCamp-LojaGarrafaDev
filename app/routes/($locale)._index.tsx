// 1. Mudamos a importação para o novo padrão do Hydrogen/React Router
import { useLoaderData } from "react-router";

// O Loader agora é uma função simples e direta
export async function loader() {
  const produtoMock = {
    name: "Garrafa Térmica Dev",
    sku: "garrafa-dev-01",
    price: 150,
    custom_attributes: [
      { 
        attribute_code: "image", 
        value: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop" 
      },
      { 
        attribute_code: "tech_stack", 
        value: "Node.js, React e Adobe Commerce" 
      }
    ]
  };

  return { produto: produtoMock };
}

export default function Homepage() {
  // Pegamos os dados usando a biblioteca correta
  const data = useLoaderData<any>();
  const produto = data.produto;

  // Lógica de busca dos atributos
  const techStack = produto.custom_attributes?.find(
    (attr: any) => attr.attribute_code === 'tech_stack'
  )?.value;

  const productImage = produto.custom_attributes?.find(
    (attr: any) => attr.attribute_code === 'image'
  )?.value;

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
            src={productImage} 
            alt={produto.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
            Exclusivo
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
              Atributo Magento (Tech Stack):
            </span>
            <p className="text-blue-900 font-semibold text-sm">
              {techStack}
            </p>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
            Comprar Agora
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <p className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">
          Conexão Magento API Ativa (Mode: Mock)
        </p>
      </div>
    </div>
  );
}