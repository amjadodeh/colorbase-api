create table users (
	id BIGSERIAL PRIMARY KEY,
	username text not null unique,
	profile_picture text default 'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg' not null,
	hash text not null 
);

create table palettes (
	id BIGSERIAL PRIMARY KEY,
	palette_name text not null,
	hex text not null,
	user_id INTEGER references users(id) ON DELETE cascade 
);
