import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { icons } from '@/constants';
import { GoogleInputProps } from '@/types/type';

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }

    const fetchPlaces = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&addressdetails=1&limit=5&countrycodes=in`,
          {
            headers: {
              'User-Agent': 'MyRideApp/1.0 (contact@myapp.com)',
              Accept: 'application/json',
            },
          }
        );

        const text = await res.text();

        if (!text.startsWith('[')) {
          console.error('Nominatim error response:', text);
          return;
        }

        const data = JSON.parse(text);
        setResults(data);
      } catch (err) {
        console.error('Nominatim search error:', err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchPlaces, 400);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <View className={`relative rounded-xl bg-white ${containerStyle}`}>
      {/* Input */}
      <View className="flex flex-row items-center px-4 py-3">
        <Image
          source={icon || icons.search}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={initialLocation ?? 'Where do you want to go?'}
          placeholderTextColor="gray"
          className="flex-1 text-base font-semibold"
          style={{
            backgroundColor: textInputBackgroundColor || 'white',
          }}
        />
      </View>

      {/* Loader */}
      {loading && (
        <View className="absolute right-4 top-4">
          <ActivityIndicator size="small" />
        </View>
      )}

      {/* Results */}
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id.toString()}
          className="bg-white rounded-b-xl max-h-60"
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              className="px-4 py-3 border-b border-neutral-200"
              onPress={() => {
                handlePress({
                  latitude: Number(item.lat),
                  longitude: Number(item.lon),
                  address: item.display_name,
                });
                setQuery('');
                setResults([]);
              }}
            >
              <Text className="text-sm">{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default GoogleTextInput;
