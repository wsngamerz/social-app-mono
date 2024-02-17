export type State =
    | {
          status: "success";
          message: string;
      }
    | {
          status: "error";
          message: string;
          errors?: { [key: string]: string[] };
      }
    | null;
