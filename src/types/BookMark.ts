import { Article } from "./Articles";

interface BookMark {
  id: number;
  article_id: number;
  article: Article;
}

export type { BookMark };
