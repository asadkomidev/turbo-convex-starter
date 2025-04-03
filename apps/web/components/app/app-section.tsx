import { ReactNode, createContext, useContext } from "react";
import { cn } from "@workspace/ui/lib/utils";

const AppSectionContext = createContext(false);
const AppSectionHeaderContext = createContext(false);

interface AppSectionProps {
  className?: string;
  children: ReactNode;
  id?: string;
}

const AppSection = ({ className, children, id }: AppSectionProps) => {
  return (
    <AppSectionContext.Provider value={true}>
      <section className={cn("py-16 md:py-32 ", className)} id={id}>
        {children}
      </section>
    </AppSectionContext.Provider>
  );
};

interface AppSectionHeaderProps {
  className?: string;
  children: ReactNode;
}

const AppSectionHeader = ({ className, children }: AppSectionHeaderProps) => {
  const isWithinModal = useContext(AppSectionContext);

  if (!isWithinModal) {
    throw new Error("AppSectionHeader must be used within AppSection");
  }

  return (
    <AppSectionHeaderContext.Provider value={true}>
      <div className={cn("", className)}>{children}</div>
    </AppSectionHeaderContext.Provider>
  );
};

interface AppSectionTitleProps {
  className?: string;
  children: ReactNode;
  subTitle?: boolean;
}

const AppSectionTitle = ({
  className,
  children,
  subTitle,
}: AppSectionTitleProps) => {
  const isWithinHeader = useContext(AppSectionHeaderContext);

  if (!isWithinHeader) {
    throw new Error("AppSectionTitle must be used within AppSectionHeader");
  }

  return (
    <h1
      className={cn(
        "text-3xl text-center px-4 font-semibold md:text-5xl",
        subTitle ? "text-2xl md:text-3xl text-start px-0" : "",
        className
      )}
    >
      {children}
    </h1>
  );
};

interface AppSectionDescriptionProps {
  className?: string;
  children: ReactNode;
  subTitle?: boolean;
}

const AppSectionDescription = ({
  className,
  children,
  subTitle,
}: AppSectionDescriptionProps) => {
  const isWithinHeader = useContext(AppSectionHeaderContext);

  if (!isWithinHeader) {
    throw new Error(
      "AppSectionDescription must be used within AppSectionHeader"
    );
  }

  return (
    <p
      className={cn(
        "mx-auto text-center text-muted-foreground mt-4 px-4 max-w-2xl text-wrap text-base md:text-lg ",
        subTitle ? "text-start px-0 text-sm mt-0" : "",
        className
      )}
    >
      {children}
    </p>
  );
};

interface AppSectionContentProps {
  className?: string;
  children: ReactNode;
}

const AppSectionContent = ({ className, children }: AppSectionContentProps) => {
  const isWithinModal = useContext(AppSectionContext);

  if (!isWithinModal) {
    throw new Error("AppSectionContent must be used within AppSection");
  }

  return (
    <div className={cn("mx-auto max-w-5xl px-4", className)}>{children}</div>
  );
};

export {
  AppSection,
  AppSectionHeader,
  AppSectionTitle,
  AppSectionDescription,
  AppSectionContent,
};
