import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface CardProps {
  url: string;
  title: string;
  description: string;
  action: string;
  actionVariant: "outline" | "default";
  actionIcon: React.ReactNode;
  actionText: string;
  footer: string;
  footerText: string;
  footerIcon: React.ReactNode;
  footerDescription: string;
}
const cards: CardProps[] = [
  {
    url: "#",
    title: "Book Audio - all",
    description: "$1,250.00",
    action: "12.5%",
    actionVariant: "outline",
    actionIcon: <IconTrendingUp />,
    actionText: "+12.5%",
    footer: "Trending up this month",
    footerText: "Visitors for the last 6 months",
    footerIcon: <IconTrendingUp className="size-4" />,
    footerDescription: "Visitors for the last 6 months",
  },
  {
    url: "#",
    title: "New Customers",
    description: "1,234",
    action: "20%",
    actionVariant: "outline",
    actionIcon: <IconTrendingDown />,
    actionText: "-20%",
    footer: "Down 20% this period",
    footerText: "Acquisition needs attention",
    footerIcon: <IconTrendingDown className="size-4" />,
    footerDescription: "Acquisition needs attention",
  },
  {
    url: "#",
    title: "Active Accounts",
    description: "45,678",
    action: "12.5%",
    actionVariant: "outline",
    actionIcon: <IconTrendingUp />,
    actionText: "+12.5%",
    footer: "Strong user retention",
    footerText: "Engagement exceed targets",
    footerIcon: <IconTrendingUp className="size-4" />,
    footerDescription: "Engagement exceed targets",
  },
  {
    url: "#",
    title: "Growth Rate",
    description: "4.5%",
    action: "4.5%",
    actionVariant: "outline",
    actionIcon: <IconTrendingUp />,
    actionText: "+4.5%",
    footer: "Steady performance increase",
    footerText: "Meets growth projections",
    footerIcon: <IconTrendingUp className="size-4" />,
    footerDescription: "Meets growth projections",
  },
];
export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => (
        <Link
          href={card.url}
          key={index}
          className="hover:translate-y-1 duration-200 ease-linear"
        >
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.description}
              </CardTitle>
              <CardAction>
                <Badge variant={card.actionVariant}>
                  {card.actionIcon}
                  {card.actionText}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {card.footer} {card.footerIcon}
              </div>
              <div className="text-muted-foreground">{card.footerText}</div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
