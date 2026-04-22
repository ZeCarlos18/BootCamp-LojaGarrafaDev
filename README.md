<pre>
Loja Garrafa Dev - E-commerce Headless
Este é o projeto final do Bootcamp de E-commerce, focado numa arquitetura Headless e Composable. O sistema integra múltiplos microsserviços de backend a uma única interface moderna desenvolvida em React.

Arquitetura do Sistema
O projeto utiliza o Adobe Commerce (Magento) para gestão de regras de negócio, o Adobe Experience Manager (AEM) como CMS Headless para gestão de conteúdos, e a Shopify para o motor de checkout, tudo consumido por um frontend Shopify Hydrogen.

Snippet de código
graph TD
    %% Definição de Estilos Profissionais
    classDef frontend fill:#f8fafc,stroke:#3b82f6,stroke-width:2px,color:#1e293b,font-weight:bold
    classDef nuvem fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#166534
    classDef local fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#92400e

    subgraph &quot;Frontend (Camada de Experiência Headless)&quot;
        H[&quot;Shopify Hydrogen<br>(React / Remix)&quot;]:::frontend
    end

    subgraph &quot;Sistemas de Backend (Arquitetura Composable)&quot;
        M[&quot;Adobe Commerce (Magento)<br>Servidor Local (Docker/WSL)&quot;]:::local
        AEM[&quot;Adobe Experience Manager<br>Servidor Local (Java: 4502)&quot;]:::local
        S[&quot;Shopify Storefront<br>Servidor Cloud (Oficial)&quot;]:::nuvem
    end

    %% Conexões e Fluxo de Dados
    M -- &quot;REST API <br> Atributos (tech_stack) e Preços&quot; --&gt; H
    AEM -- &quot;GraphQL API <br> Content Fragments (Garrafa Dev)&quot; --&gt; H
    S -- &quot;GraphQL API <br> Storefront Token / Checkout&quot; --&gt; H
</pre>
