-- -- 1)
-- -- Formule expressões em SQL que retornem o id, nome e gênero de autores que publicaram artigos que tem tipo com nome igual à 'Graduação'.
-- -- Forneça pelo menos duas expressões que sejam capazes de retornar estes dados.
-- SELECT autores.autorid, autores.nome, autores.genero FROM autores JOIN autoresartigo ON autoresartigo.autorid = autores.autorid JOIN artigos ON autoresartigo.artigoid = artigos.artigoid JOIN tipos ON artigos.tipoid = tipos.tipoid AND tipos.nome = 'Graduação';

-- -- 2)
-- -- Crie expressões em SQL que retornem o ano e a cidade das edições que tiveram a maior quantidade de participantes.
-- -- Forneça pelo menos duas expressões que sejam capazes de retornar estes dados.
-- SELECT edicoes.ano, edicoes.cidade FROM edicoes WHERE edicoes.qtdparticipantes = (SELECT MAX(edicoes.qtdparticipantes) FROM edicoes);

-- -- 3)
-- -- Formule uma expressão em SQL que retorne id e ano de edições diferentes mas que têm artigos de um mesmo tipo (tipoid na relação artigos).
-- -- Garanta que um mesmo par de edições não seja retornado na resposta, nem mesmo em posições invertidas.
-- SELECT edicoes.edicaoid, edicoes.ano, edicoesAux.edicaoid, edicoesAux.ano 
-- 	FROM edicoes 
--   	JOIN edicoes AS edicoesAux ON edicoes.edicaoid <> edicoesAux.edicaoid AND edicoes.ano <> edicoesAux.ano 
--   	JOIN artigos ON artigos.edicaoid = edicoes.edicaoid
-- ;

-- -- 4)
-- -- Faça uma expressão em SQL que retorne o nome dos autores que publicaram em todas as edições que ocorreram na cidade de Passo Fundo.
-- SELECT edicoes.edicaoid FROM edicoes WHERE edicoes.cidade = 'Passo Fundo';

-- -- 5)
-- -- Formule uma expressão em SQL que retorne o id e ano de todas as edições, bem como o título dos seus respectivos artigos.
-- -- Caso a edição não possua artigos, apresentar o título do artigo como nulo ou branco.
-- SELECT edicoes.edicaoid, edicoes.ano, artigos.titulo FROM edicoes JOIN artigos ON artigos.edicaoid = edicoes.edicaoid;
