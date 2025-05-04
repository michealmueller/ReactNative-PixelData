import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { Platform, GestureResponderEvent } from 'react-native';

export function ExternalLink({
  href,
  ...rest
}: {
  href: string;
  [key: string]: any;
}) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event: GestureResponderEvent) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
