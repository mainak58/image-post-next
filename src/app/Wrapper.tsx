import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
    );
}
