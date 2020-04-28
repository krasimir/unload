import { settings } from '../../state';

export default function settingsController({ data }) {
  const updateSettings = settings.mutate();

  data({
    settings,
    changeKeywords(newKeywords) {
      updateSettings({
        ...settings(),
        keywords: newKeywords
      });
    }
  });
};
