const RefineSlug = (slug: string[] | undefined): string | null => {
  if (!slug || slug.length === 0) {
    return null;
  }
  return slug.join("/");
};

export default RefineSlug;

