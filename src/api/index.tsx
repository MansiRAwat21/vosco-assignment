import axios from 'axios';

interface Activity {
  activity: string;
  type: string;
  participants: number;
}

const fetchActivities = async (): Promise<Activity[]> => {
  const response = await axios.get<Activity>('https://www.boredapi.com/api/activity');
  // Wrap the single activity in an array before returning
  return [response.data];
};

export default fetchActivities;
