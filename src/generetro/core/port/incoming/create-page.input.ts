import { z } from "zod";

import { Input } from "~/shared/input";

const schema = z.object({
  today: z.date(),
});

type Props = z.infer<typeof schema>;

export class CreatePageInput extends Input<Props> {
  protected validate(value: Props): Props {
    return schema.parse(value);
  }
}
