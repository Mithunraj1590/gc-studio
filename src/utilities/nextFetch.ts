type FetchOptions = RequestInit;

const nextFetch = async (slug: string, ...opt: FetchOptions[]): Promise<any> => {
  const fetchOptions: FetchOptions = {
    cache: "no-store",
    ...opt,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${slug}`,
      fetchOptions
    );

    if (!res.ok) {
      return undefined;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return undefined;
  }
};

export default nextFetch;

