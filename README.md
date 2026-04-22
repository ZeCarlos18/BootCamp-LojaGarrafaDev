Loja Garrafa Dev - E-commerce Headless

Este é o projeto final do Bootcamp de E-commerce, focado em uma arquitetura Headless e Composable. O sistema integra múltiplos microsserviços de backend a uma única interface moderna desenvolvida em React.

Arquitetura do Sistema

O projeto utiliza o Adobe Commerce (Magento) para gestão de regras de negócio, o Adobe Experience Manager (AEM) como CMS Headless para gestão de conteúdos, e a Shopify para o motor de checkout, tudo consumido por um frontend Shopify Hydrogen.

```mermaid
graph TD
    classDef frontend fill:#f8fafc,stroke:#3b82f6,stroke-width:2px,color:#1e293b,font-weight:bold
    classDef nuvem fill:#f0fdf4,stroke:#22c55e,stroke-width:2px,color:#166534
    classDef local fill:#fffbeb,stroke:#f59e0b,stroke-width:2px,color:#92400e

    subgraph "Frontend (Camada de Experiencia Headless)"
        H["Shopify Hydrogen (React / Remix)"]:::frontend
    end

    subgraph "Sistemas de Backend (Arquitetura Composable)"
        M["Adobe Commerce / Magento (Servidor Local WSL)"]:::local
        AEM["Adobe Experience Manager (Servidor Local)"]:::local
        S["Shopify Storefront (Servidor Cloud Oficial)"]:::nuvem
    end

    M -- "REST API: Atributos e Precos" --> H
    AEM -- "GraphQL API: Content Fragments" --> H
    S -- "GraphQL API: Storefront e Checkout" --> H
````

## 🔄 Fluxos de Integração Construídos

1. **Commerce → AEM:** O Commerce expõe uma API REST com o catálogo, e o AEM consome via Sling Model para renderizar no componente "Product Showcase".
2. **Shopify → Hydrogen:** O Hydrogen consome o catálogo e gerencia o checkout via Storefront API (GraphQL).
3. **AEM → Hydrogen:** O Hydrogen consome os Content Fragments do AEM (como a Garrafa Dev) via GraphQL para alimentar páginas de conteúdo.
4. **Dashboard Central:** O Hydrogen agrega o status de saúde das três plataformas em paralelo usando `Promise.allSettled`.

## 🔌 Tabela de Endpoints e APIs

| Plataforma | Tecnologia | URL / Endpoint | Autenticação |
| :--- | :--- | :--- | :--- |
| **Adobe Commerce** | REST | `/rest/V1/bootcamp/products` | Anonymous |
| **AEM (Experience Manager)** | GraphQL | `/content/graphql/execute.json/...` | Basic Auth (admin) |
| **Shopify Storefront** | GraphQL | `https://[sua-loja].myshopify.com/api/2024-01/graphql.json` | Storefront API Token |
