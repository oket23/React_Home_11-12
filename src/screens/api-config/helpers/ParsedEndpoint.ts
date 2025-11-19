import type {ParsedEndpoint} from "@/screens/api-config/types/IApi.ts";

export const parseEndpoint = (rawKey: string, description: string): ParsedEndpoint => {

    const [methodPart, ...rest] = rawKey.split(" ");
    const method = methodPart?.toUpperCase() ?? "GET";
    const path = rest.join(" ") || rawKey;

    return {
        key: rawKey,
        method,
        path,
        description,
    };
};