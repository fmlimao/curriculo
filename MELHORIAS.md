# Melhorias do site pessoal

## Objetivo

Melhorar o site pessoal em `index.html` com foco em:

- SEO técnico
- organização semântica dos dados
- clareza do conteúdo profissional
- manutenção futura

## Prioridade alta

### 1. Atualizar os metadados principais

- [x] Reescrever a tag `<title>` com posicionamento mais específico.
- [x] Reescrever a `meta description` com linguagem natural e foco nas principais especialidades.
- [x] Corrigir termos desatualizados ou com erro de escrita, como `Boostrap`.
- [x] Atualizar o `copyright`.
- [x] Revisar `theme-color`.

### 2. Corrigir e modernizar analytics

- Remover o uso de Universal Analytics (`UA-*`), que está obsoleto.
- Decidir entre migrar para GA4 ou remover analytics temporariamente.
- Se GA4 for adotado, configurar a nova tag corretamente.

### 3. Adicionar SEO técnico essencial

- [x] Incluir tag `canonical` apontando para a URL principal.
- [x] Adicionar metadados de compartilhamento para Twitter Card.
- [x] Adicionar `og:locale`.
- [x] Garantir que `og:title`, `og:description` e `og:image` estejam consistentes com o conteúdo atual.

### 4. Estruturar dados com JSON-LD

- [x] Adicionar um bloco JSON-LD com schema `Person`.
- [x] Incluir:
  - nome
  - cargo principal
  - URL do site
  - imagem
  - e-mail
  - perfis sociais (`sameAs`)
  - descrição profissional
- [x] Avaliar inclusão de `knowsAbout` com as principais stacks e especialidades.

### 5. Melhorar o posicionamento do conteúdo principal

- [x] Reescrever a seção `Sobre Mim` para deixar claro:
  - especialidade principal
  - tempo de experiência
  - tipo de produto/sistema que desenvolve
  - senioridade técnica e liderança
- [x] Evitar texto genérico demais.
- [x] Escrever pensando em como alguém pesquisaria por esse perfil no Google.

## Prioridade média

### 6. Reorganizar a seção de experiências

- Padronizar cada experiência com:
  - empresa
  - cargo
  - período
  - principais responsabilidades
  - tecnologias usadas
  - resultados ou impacto
- Melhorar a hierarquia semântica dos títulos.
- Evitar repetição excessiva de frases como “Desenvolvimento e manutenção de sistemas em geral”.
- Destacar o que diferencia cada experiência.

### 7. Melhorar a seção de habilidades

- Separar habilidades por categorias:
  - backend
  - frontend
  - mobile
  - banco de dados
  - liderança e arquitetura
- Remover tecnologias irrelevantes, antigas demais ou pouco estratégicas, se não fizerem mais sentido para o posicionamento atual.
- Ordenar as stacks pela relevância atual.

### 8. Melhorar a seção de formação

- Incluir períodos, se fizer sentido.
- Avaliar inclusão de certificações, cursos ou formações complementares relevantes.
- Manter apenas o que reforça autoridade profissional.

### 9. Criar uma seção de projetos ou cases

- Adicionar projetos reais, produtos, sistemas ou cases profissionais.
- Para cada item, incluir:
  - nome
  - contexto
  - papel exercido
  - stack
  - resultado
- Sempre que possível, adicionar links.

### 10. Melhorar os links de contato

- Adicionar `rel="noopener noreferrer"` em links externos com `target="_blank"`.
- Avaliar exibir texto junto com ícones para melhorar acessibilidade e clareza.
- Confirmar se todos os links ainda estão corretos e atuais.

## Prioridade baixa

### 11. Refinar semântica HTML

- Revisar uso de `header`, `section`, `article`, `aside` e `address`.
- Garantir hierarquia consistente entre `h1`, `h2`, `h3` e `h4`.
- Avaliar se parte do microdata atual deve ser removida para evitar marcação incompleta ou confusa.

### 12. Melhorar acessibilidade

- Garantir nomes acessíveis para links só com ícone.
- Revisar contraste de cores.
- Avaliar foco visível nos elementos interativos.
- Revisar alternativa textual de imagens.

### 13. Revisar performance básica

- Avaliar dependência de CSS não utilizado.
- Verificar se `tailwind.min.css` está trazendo mais do que o necessário.
- Considerar otimização da imagem de perfil.
- Verificar cache e compressão no ambiente de hospedagem.

### 14. Melhorar manutenção do conteúdo

- Separar conteúdo profissional em uma estrutura mais fácil de editar no futuro.
- Considerar migrar experiências, habilidades e metadados para um formato estruturado.
- Avaliar uma versão futura com geração estática ou componentes reutilizáveis, sem perder simplicidade.

## Itens que podem ser removidos ou revisados

- `meta keywords`, pois tem pouco ou nenhum valor prático hoje.
- `X-UA-Compatible`, que não faz mais diferença em navegadores modernos.
- microdata parcial, caso o JSON-LD passe a ser a fonte principal dos dados estruturados.

## Ordem recomendada de execução

1. Atualizar metadados e descrição profissional.
2. Adicionar canonical, Twitter Card e JSON-LD.
3. Corrigir analytics.
4. Reorganizar experiências e habilidades.
5. Adicionar seção de projetos/cases.
6. Revisar acessibilidade e performance.
7. Pensar em uma estrutura melhor de manutenção.

## Resultado esperado

Ao final dessas melhorias, o site deve:

- explicar melhor quem você é e o que faz
- ser mais fácil de interpretar por mecanismos de busca
- transmitir mais senioridade e clareza para recrutadores e clientes
- ficar mais simples de atualizar no futuro
