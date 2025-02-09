import { create } from 'zustand';

type AttributeTableStore = {
  attributes: Record<string, string>;
  updateAttribute: (id: string, value: string) => void;
  nodeToAdd: null | { nodeId: string; targetId?: string; sourceId?: string };
};

export const useAttributeTableStore = create<AttributeTableStore>((set) => ({
  attributes: {
    'a-s-a': 'Sylvain & Harmen',
    'b-t-a': 'CAM',
    'b-t-b': 'ERP',
    'a-s-b': 'D2P',
    'b-t-c': 'Design to Production',
    'a-s-c': 'Technowood',
    'a-s-d': 'Borm',
    'a-s-e': 'LignoCam',
    'a-s-f': 'BIG',
    'b-t-e': 'Architect',
    'a-s-g': 'Compass Timber',
    'b-t-f': 'No work',
    'b-t-d': '',
  },
  updateAttribute: (id: string, value: string) => {
    set((state) => ({ attributes: { ...state.attributes, [id]: value } }));
  },
  nodeToAdd: null,
}));
