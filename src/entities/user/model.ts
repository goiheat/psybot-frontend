export type AddressForm = "informal" | "formal";
export type ReplyTempo = "fast" | "calm" | "slow";

export interface User {
  id: string;
  firstName: string;
  phoneRaw: string;
  joinedAt: Date;
  preferences: {
    tempo: ReplyTempo;
    addressForm: AddressForm;
    quietReminders: boolean;
    nightMode: boolean;
  };
  clinic: {
    name: string;
    city: string;
    methodology: string;
  };
}

export const currentUser: User = {
  id: "u-1",
  firstName: "Андрей",
  phoneRaw: "+79031234208",
  joinedAt: new Date(2026, 3, 29),
  preferences: {
    tempo: "calm",
    addressForm: "informal",
    quietReminders: true,
    nightMode: false,
  },
  clinic: {
    name: "Эмпатия",
    city: "Москва",
    methodology: "клинический протокол КПТ",
  },
};
