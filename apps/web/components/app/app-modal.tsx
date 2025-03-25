import { ReactNode, createContext, useContext } from "react";
import { cn } from "@workspace/ui/lib/utils";

const AppModalContext = createContext(false);
const AppModalHeaderContext = createContext(false);

interface AppModalProps {
  className?: string;
  children: ReactNode;
}

interface AppModalHeaderProps {
  className?: string;
  children: ReactNode;
}

const AppModal = ({ className, children }: AppModalProps) => {
  return (
    <AppModalContext.Provider value={true}>
      <div className={cn("flex flex-col h-full", className)}>{children}</div>
    </AppModalContext.Provider>
  );
};

const AppModalHeader = ({ className, children }: AppModalHeaderProps) => {
  const isWithinModal = useContext(AppModalContext);

  if (!isWithinModal) {
    throw new Error("AppModalHeader must be used within AppModal");
  }

  return (
    <AppModalHeaderContext.Provider value={true}>
      <div className={cn("px-4 py-2 border-[0.5px] bg-sidebar", className)}>
        {children}
      </div>
    </AppModalHeaderContext.Provider>
  );
};

interface AppModalTitleProps {
  className?: string;
  children: ReactNode;
}

const AppModalTitle = ({ className, children }: AppModalTitleProps) => {
  const isWithinHeader = useContext(AppModalHeaderContext);

  if (!isWithinHeader) {
    throw new Error("AppModalTitle must be used within AppModalHeader");
  }

  return <h1 className={cn("text-xl font-medium", className)}>{children}</h1>;
};

interface AppModalDescriptionProps {
  className?: string;
  children: ReactNode;
}

const AppModalDescription = ({
  className,
  children,
}: AppModalDescriptionProps) => {
  const isWithinHeader = useContext(AppModalHeaderContext);

  if (!isWithinHeader) {
    throw new Error("AppModalDescription must be used within AppModalHeader");
  }

  return (
    <p className={cn("text-xs text-muted-foreground", className)}>{children}</p>
  );
};

interface AppModalHeaderActionsProps {
  className?: string;
  children: ReactNode;
}

const AppModalHeaderActions = ({
  className,
  children,
}: AppModalHeaderActionsProps) => {
  const isWithinHeader = useContext(AppModalHeaderContext);

  if (!isWithinHeader) {
    throw new Error("AppModalHeaderActions must be used within AppModalHeader");
  }

  return <div className={cn("", className)}>{children}</div>;
};

interface AppModalContentProps {
  className?: string;
  children: ReactNode;
}

const AppModalContent = ({ className, children }: AppModalContentProps) => {
  const isWithinModal = useContext(AppModalContext);

  if (!isWithinModal) {
    throw new Error("AppModalContent must be used within AppModal");
  }

  return <div className={cn("px-4", className)}>{children}</div>;
};

interface AppModalFooterProps {
  className?: string;
  children: ReactNode;
}

const AppModalFooter = ({ className, children }: AppModalFooterProps) => {
  const isWithinModal = useContext(AppModalContext);

  if (!isWithinModal) {
    throw new Error("AppModalFooter must be used within AppModal");
  }

  return (
    <div className={cn("px-4 py-2 border-[0.5px] bg-sidebar", className)}>
      {children}
    </div>
  );
};

export {
  AppModal,
  AppModalHeader,
  AppModalTitle,
  AppModalDescription,
  AppModalHeaderActions,
  AppModalContent,
  AppModalFooter,
};
