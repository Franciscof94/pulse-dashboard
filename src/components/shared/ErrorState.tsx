import { FC } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {message}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Try again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
