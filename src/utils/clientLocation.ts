import { ClientLocationData } from '../types';

/**
 * Parses user agent into human-readable device and browser strings
 */
const getDeviceDetails = (): { device: string; browser: string; os: string } => {
  if (typeof window === 'undefined') {
    return { device: 'Unknown', browser: 'Unknown', os: 'Unknown' };
  }

  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  if (/android/i.test(ua)) os = 'Android';
  else if (/iPad|iPhone|iPod/.test(ua)) os = 'iOS';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet';

  let browser = 'Unknown Browser';
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua) && !/opr/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr\//i.test(ua)) browser = 'Opera';
  else if (/samsung/i.test(ua)) browser = 'Samsung Internet';

  return { device, browser, os };
};

/**
 * Attempts to capture client location via IP lookup & GPS Geolocation
 */
export const captureClientLocation = async (): Promise<ClientLocationData> => {
  const { device, browser, os } = getDeviceDetails();
  const capturedAt = new Date().toISOString();

  const result: ClientLocationData = {
    device,
    browser,
    os,
    capturedAt,
    source: 'network',
  };

  // 1. First, fetch IP-based location (fast, non-intrusive)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const ipRes = await fetch('https://ipwho.is/', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (ipRes.ok) {
      const data = await ipRes.json();
      if (data && data.success !== false) {
        result.ip = data.ip || '';
        result.city = data.city || '';
        result.region = data.region || '';
        result.country = data.country || 'Bangladesh';
        result.countryCode = data.country_code || 'BD';
        result.latitude = typeof data.latitude === 'number' ? data.latitude : undefined;
        result.longitude = typeof data.longitude === 'number' ? data.longitude : undefined;
        result.isp = data.connection?.isp || data.connection?.org || '';
        result.source = 'ip';

        const parts = [data.city, data.region, data.country].filter(Boolean);
        result.formattedAddress = parts.join(', ');
        if (result.latitude && result.longitude) {
          result.mapsUrl = `https://www.google.com/maps?q=${result.latitude},${result.longitude}`;
        }
      }
    }
  } catch (err) {
    // If ipwho.is fails or times out, try secondary fallback
    try {
      const fallbackController = new AbortController();
      const fbTimeout = setTimeout(() => fallbackController.abort(), 2500);
      const fallbackRes = await fetch('https://ipapi.co/json/', {
        signal: fallbackController.signal,
      });
      clearTimeout(fbTimeout);

      if (fallbackRes.ok) {
        const fbData = await fallbackRes.json();
        result.ip = fbData.ip || result.ip;
        result.city = fbData.city || result.city;
        result.region = fbData.region || result.region;
        result.country = fbData.country_name || result.country;
        result.latitude = fbData.latitude || result.latitude;
        result.longitude = fbData.longitude || result.longitude;
        result.isp = fbData.org || result.isp;
        result.source = 'ip';
        const parts = [fbData.city, fbData.region, fbData.country_name].filter(Boolean);
        result.formattedAddress = parts.join(', ');
        if (result.latitude && result.longitude) {
          result.mapsUrl = `https://www.google.com/maps?q=${result.latitude},${result.longitude}`;
        }
      }
    } catch {
      // Offline or network error
    }
  }

  // 2. Next, check if browser GPS geolocation is already available or can be obtained quickly
  if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
    try {
      const gpsPosition = await new Promise<GeolocationPosition | null>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos),
          () => resolve(null),
          { timeout: 3000, maximumAge: 60000, enableHighAccuracy: true }
        );
      });

      if (gpsPosition && gpsPosition.coords) {
        result.latitude = gpsPosition.coords.latitude;
        result.longitude = gpsPosition.coords.longitude;
        result.accuracyMeters = Math.round(gpsPosition.coords.accuracy);
        result.source = 'gps';
        result.mapsUrl = `https://www.google.com/maps?q=${gpsPosition.coords.latitude},${gpsPosition.coords.longitude}`;
        
        if (!result.city) {
          result.formattedAddress = `GPS Coordinates (${gpsPosition.coords.latitude.toFixed(5)}, ${gpsPosition.coords.longitude.toFixed(5)})`;
        }
      }
    } catch {
      // Geolocation denied or unavailable
    }
  }

  // Fallback defaults if everything was blocked/offline
  if (!result.city && !result.latitude) {
    result.city = 'Dhaka';
    result.region = 'Dhaka Division';
    result.country = 'Bangladesh';
    result.latitude = 23.8103;
    result.longitude = 90.4125;
    result.mapsUrl = 'https://www.google.com/maps?q=23.8103,90.4125';
    result.formattedAddress = 'ঢাকা, বাংলাদেশ (ডিফল্ট নেটওয়ার্ক জোন)';
  }

  return result;
};
