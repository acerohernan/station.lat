export interface Params {
  message: string;
  quantity: number;
}

export const coreMessage = (params: Params) => {
  console.log(
    `Invoking the core function, the message is: ${params.message} and the quantity is ${params.quantity}`
  );
};
