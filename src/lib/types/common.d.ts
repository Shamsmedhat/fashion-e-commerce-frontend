declare type SearchParams = string | string[] | undefined;

declare type RouteProps = {
  params: { locale: import("next-intl").Locale };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;
