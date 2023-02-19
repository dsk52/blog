import TagManager from "react-gtm-module";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

type Props = {
  gtmId: string;
};

export function useInitTagManager({ gtmId }: Props) {
  useIsomorphicLayoutEffect(() => {
    TagManager.initialize({ gtmId });
  }, []);
}
