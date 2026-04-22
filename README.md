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
