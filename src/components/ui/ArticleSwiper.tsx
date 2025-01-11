import React, { useRef } from "react";
import "swiper/css";
import BaseSwiper from "./BaseSwiper";
import ArticleCard from "./ArticleCard";

interface ArticleItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ArticleSwiperProps {
  items: ArticleItem[];
  urlPrefix: string;
}

const ArticleSwiper: React.FC<ArticleSwiperProps> = ({ items, urlPrefix }) => {
  return (
    <BaseSwiper>
      {items.map((item, index) => (
        <ArticleCard
          href={`${urlPrefix}/${item.id}/`}
          imagePath={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </BaseSwiper>
  );
};

export default ArticleSwiper;
