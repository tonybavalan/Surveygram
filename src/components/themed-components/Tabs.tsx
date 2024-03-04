import { cn } from "@/lib/utils";

interface TabProps {
  options: any[];
  onTabChange: (index: number) => void;
  selected: number;
  className?: string;
}

const Tabs: React.FC<TabProps> = (props) => {
  const { options, onTabChange, selected, className } = props;
  return (
    <div className={cn("themed-tabs--wrapper", className)}>
      {options.map((tab, index) => {
        return (
          <div
            className={cn("tabs--option", selected === index ? "active" : "")}
            onClick={() => onTabChange(index)}
            key={`${tab.name}-${index}`}
          >
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
