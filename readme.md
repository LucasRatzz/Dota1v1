# Dota 2 challenge 1v1

- Adicionar armadura
  - Novo param na criação
    - Pode ser negativo
  - Nova prop no heroi
    - Deve ser função, para retornar valor dinâmico baseado na agi
  - Função de cálculo de redução de dano
    - dado X de armadura, quantos % reduz de dano
    - armadura principal = armadura base + (Agilidade * (1 / 5,9999999999999))

- Adicionar attack speed
  - Função para transformar attack speed em ataques por segundo
  - Heroi também attack speed base
  - Acho que hérois tem um esquema de attack animation tbm (não precisa ser calculado esta sendo fornecido de parametro)
  - Ataques por segundo = [(100 + AVA) × 0,01] / TBA
  - Tempo de ataque = TBA / [(100 + AVA) × 0,01] = 1 / (ataques por segundo)

- Implementar life regen
  - Adicionar life regen básico
  - Adicionar cálculo de life regen com atributos
  
- Implementar mana regen
  - Adicionar mana regen básico
  - Adicionar cálculo de mana regen com atributos

- Batalha
  - Em tempo real
  - Heroi ataca conforme attack speed

# Armadura
# Attack speed
# API
# Batalha