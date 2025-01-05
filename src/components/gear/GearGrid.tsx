import GearCard from "./GearCard.tsx";
import gear from "../../data/gear.json";
import Grid from "../ui/Grid.tsx";

const GearSwiper: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <Grid>
        {gear.map((item) => (
          <GearCard
            title={item.title}
            description={item.description}
            img={item.img}
            url={item.url}
          />
        ))}
      </Grid>
    </div>
  );
};

export default GearSwiper;
