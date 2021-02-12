INSERT INTO users (username, hash)
VALUES
  ('asdfUser', '$2a$10$pMktW.1/A0SzsFA83j69hOKmzm0OG.zxfKkYNGjfJtKCOLgfPAGFC' ), 
  ('qwertyUser', '$2a$10$4rwr7D3Jz7V9OAavoiYjjuid5QsVUsDWrLIhfTK97ORtv1pVX9mfG' ); 
 
INSERT INTO palettes (palette_name, hex, user_id)
VALUES
  ('Colorrrrssss', 									'#ff0000,#00ff00,#0000ff,#ff00ff,,,,,,', 																						1 ),
  ('Nice Colors', 									'#ffff00,#00ffff,#f0f0f0,#0f0f0f,,,,,,', 																						2 ),
  ('Noice Colours', 								'#0f000f,#f000f0,#000f00,#00f000,,,,,,',																						2 ),
  ('Down the rabit hole...', 				'#000000,#00ff00,#000000,#00ff00,#000000,,,,,', 																		1 ),
  ('Taking the red pill.',					'#000000,#00ff00,#000000,#00ff00,#000000,,,,,', 																		1 ),
  ('Am I The Chosen One?', 					'#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,,,,', 															1 ),
  ('He''s beginning to believe!!!', '#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00,#000000,#00ff00', 	1 );

-- password for 'asdfUser' is 'asdfPass'
-- password for 'qwertyUser' is 'qwertyPass'
