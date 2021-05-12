# Regular Expressions:


### email:

 /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

### HTML tag:

/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/

### IP adress:

/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

### URL:


### Slug:

/^[a-z0-9-]+$/

### Date dd/mm/yyyy:

/\b(0?[1-9]|[12][0-9]|3[01])([ \/\-])(0?[1-9]|1[012])\2([0-9][0-9][0-9][0-9])(([ -])([0-1]?[0-9]|2[0-3]):[0-5]?[0-9]:[0-5]?[0-9])?\b/g
(test)

### Hex value: 

/#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/
(test)


# Ideas: 

- gerador de palavras aleatórias

- encontrar pal�ndromos

- adicionar mensagem: "Nenhum XXX(ex: palíndromo) encontrado" ao clicar em algum botão.