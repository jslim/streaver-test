export type Post = {
    id: number;
    title: string;
    body: string;
    user: {
      name: string;
    };
  };