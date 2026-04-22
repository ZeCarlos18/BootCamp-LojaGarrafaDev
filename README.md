graph TD
    %% Definição de Estilos Profissionais
    classDef frontend fill:#f8fafc,stroke:#3b82f6,stroke-width:2px,color:#1e293b,font-weight:bold
    classDef nuvem fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#166534
    classDef local fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#92400e
    classDef borda oculta

    subgraph "Frontend (Camada de Experiência Headless)"
        H["Shopify Hydrogen<br>(React / Remix)"]:::frontend
    end

    subgraph "Sistemas de Backend (Arquitetura Composable)"
        M["Adobe Commerce (Magento)<br>Servidor Local (Docker/WSL)"]:::local
        AEM["Adobe Experience Manager<br>Servidor Local (Java: 4502)"]:::local
        S["Shopify Storefront<br>Servidor Cloud (Oficial)"]:::nuvem
    end

    %% Conexões e Fluxo de Dados
    M -- "REST API <br> Atributos (tech_stack) e Preços" --> H
    AEM -- "GraphQL API <br> Content Fragments (Garrafa Dev)" --> H
    S -- "GraphQL API <br> Storefront Token / Checkout" --> H