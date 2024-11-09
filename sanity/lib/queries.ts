import { defineQuery } from "next-sanity";

export const BLOGS_QUERY = defineQuery(`
   *[_type == "blog" && defined(slug.current) && (!defined($search) || title match $search || category match $search || author->name match $search)] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      author -> {_id, name, image, bio}, 
      views,
      description,
      category,
      image,
      content,
   }`);

export const BLOG_BY_ID_QUERY = defineQuery(`
   *[_type == "blog" && _id == $id ][0]{
      _id,
      title,
      slug,
      _createdAt,
      author -> {_id, name, username, image, bio}, 
      views,
      description,
      category,
      image,
      content,
   }`);

export const BLOG_VIEWS_QUERY = defineQuery(`
   *[_type == "blog" && _id == $id][0]{
      _id, views
   }`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
   *[_type =="author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
   }`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
   *[_type =="author" && _id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
   }`);

export const BLOGS_BY_AUTHOR_QUERY = defineQuery(`
   *[_type == "blog" && author._ref == $id ] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      author -> {_id, name, image, bio}, 
      views,
      description,
      category,
      image,
      content,
   }`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
   *[_type == "playlist" && slug.current == $slug][0]{
   _id,
   title,
   slug,
   select[] -> {
      _id,
      _createdAt,
      title,
      slug,
      author -> {
         _id,
         name,
         slug,
         image,
         bio
      },
      views,
      description,
      category,
      image,
      content
      }
   }`);

export const TOP_VIEWED_BLOGS_QUERY = defineQuery(`
   *[_type == "blog" && defined(slug.current)] | order(views desc) [0...4] {
      _id,
      title,
      slug,
      _createdAt,
      author -> {_id, name, image, bio}, 
      views,
      description,
      category,
      image,
      content,
   }`);
