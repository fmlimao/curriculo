# Análise do Currículo

Análise do [index.html](index.html) com pontos fortes e sugestões de melhoria.

## Pontos fortes

- [x] SEO e metadados bem estruturados (Open Graph, Twitter Card, Schema.org e canonical)
- [x] Acessibilidade com `aria-label`, `rel="noopener noreferrer"` e `outline` no focus visível
- [x] Hierarquia semântica com `main`, `header`, `section`, `article`, `address` bem aplicados
- [x] Narrativa consistente de Tech Lead com foco em liderança técnica e IA

## Prioridade alta

### 1. Google Analytics desatualizado

**Local:** [index.html:6-13](index.html#L6-L13)

- [ ] Migrar para GA4 (`G-XXXXXXXXXX`) ou remover o script se não estiver em uso

**Contexto:** o `UA-144644601-1` é Universal Analytics, descontinuado desde julho de 2023. Os dados não estão mais sendo coletados.

---

### 2. Falta período nas experiências

**Local:** seção "Experiências" ([index.html:183-447](index.html#L183-L447))

- [x] Adicionar período (mês/ano de início e fim) em cada `article` de experiência

**Contexto:** recrutadores precisam entender a timeline. A seção "Sobre Mim" menciona "12 anos como Tech Lead" e "25 anos em TI", mas não é possível validar sem as datas.

---

### 3. Seção "Sobre Mim" genérica

**Local:** [index.html:169-175](index.html#L169-L175)

- [x] Reescrever incluindo um diferencial concreto (resultado mensurável)

**Contexto:** o texto atual descreve atuação genérica de Tech Lead. Ex.: "reduzi tempo de deploy em X%", "liderei migração que economizou Y", "implementei CRM que atendeu Z clientes".

---

## Prioridade média

### 4. Falta seção de projetos/realizações

- [x] Criar nova `section` "Projetos" ou "Realizações" após "Experiências"
- [x] Incluir 2-3 cases no formato **problema → solução → impacto**

**Contexto:** com 25 anos de TI, há projetos notáveis para destacar.

---

### 5. CTA para download de PDF

- [x] Adicionar botão "Baixar CV em PDF" no header, ao lado dos links de contato

**Contexto:** recrutadores costumam preferir baixar o CV em PDF para anexar em sistemas internos.

---

## Prioridade baixa

### 6. Link de e-mail com `target="_blank"` desnecessário

**Local:** [index.html:120-125](index.html#L120-L125)

- [x] Remover `target="_blank"` do link de e-mail

**Contexto:** links `mailto:` abrem o cliente de e-mail do usuário, não uma nova aba.

---

### 7. Idiomas ausentes

- [ ] Adicionar seção "Idiomas" com nível (básico, intermediário, avançado, fluente)

**Contexto:** informação relevante para vagas internacionais e remotas.

---

### 8. Tailwind via CDN em produção

**Local:** [index.html:66](index.html#L66)

- [ ] Revisar configuração do Tailwind e garantir que só as classes usadas estão no bundle final

**Contexto:** vale validar se o build está com `content`/`purge` configurado corretamente para evitar CSS inflado.

---

## Melhorias vindas do CV antigo

Itens extraídos do arquivo [Currículo Leandro Macedo.md](Currículo%20Leandro%20Macedo.md) que agregam ao site.

### 9. Adicionar categoria "Automações" em Habilidades

**Local:** [index.html:565-579](index.html#L565-L579)

- [x] Criar nova linha: `<strong>Automações:</strong> N8N, Power Automate e Typebot`

**Contexto:** N8N já está em "Sobre Mim", mas não aparece na seção Habilidades. Power Automate e Typebot ficaram de fora do site atual.

---

### 10. Adicionar SCRUM em "Liderança e arquitetura"

**Local:** [index.html:577-579](index.html#L577-L579)

- [x] Incluir SCRUM na lista atual ("liderança técnica, definição de soluções, manutenção evolutiva e integração entre sistemas")

**Contexto:** é a única menção a metodologia ágil que estava no CV antigo.

---

### 11. Adicionar datas na Formação

**Local:** [index.html:604-630](index.html#L604-L630)

- [x] Adicionar "2007 – 2010" em Ciências da Computação
- [x] Adicionar "2004 – 2006" no Ensino Médio e Técnico

**Contexto:** o CV antigo tem as datas. Ajuda a dar timeline completa ao leitor.

---

### 12. Corrigir nome do curso técnico

**Local:** [index.html:621](index.html#L621)

- [x] Alterar "Ensino Médio e Técnico" para "Técnico em Informática e Mecatrônica"

**Contexto:** o CV antigo traz o nome oficial do curso. Mais preciso e valoriza a formação técnica.

---

### 13. Avaliar adicionar localização no header

- [ ] Decidir se inclui "Guarulhos – SP" no header ou só no JSON-LD (`address`)

**Contexto:** pode ser relevante para filtros de vagas híbridas/presenciais. Depende se você prefere manter o site como "sem localização" para não limitar.

---

### 14. Avaliar usar nome completo

- [ ] Decidir se usa "Leandro Fernandes de Macedo" ou mantém "Leandro Macedo"

**Contexto:** o CV antigo traz o nome completo. O site usa a versão curta, que é mais "marca pessoal". Decisão de posicionamento.
