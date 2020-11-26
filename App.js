import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
 
const Home = (props) => {
    const fetchJadwalSholat = async () => {
        try {
            const apiName =
                'http://api.aladhan.com/v1/hijriCalendarByCity?city=Jakarta&country=Indonesia';
            let response = await fetch(apiName);
            let responseJson = await response.json();
            if (responseJson) {
                setSholatTiming(responseJson.data[0].timings);
                console.log('sholat timings ->', responseJson.data[0].timings);
            }
        } catch (error) {
            console.log('error ->', error);
        }
    };
 
    const [sholatTiming, setSholatTiming] = useState([]);
    useEffect(() => {
        fetchJadwalSholat();
    }, []);
 
    const renderJadwalSholat = (title, time) => (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: 16,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: 'gray',
                    marginHorizontal: 8,
                    width: 360
                }}>
                <Text style={{ flex: 1, color: 'gray', margin: 10 }}>{title}</Text>
                <Text style={{ color: 'gray', margin: 10 }}>{time}</Text>
            </View>
        </>
    );
 
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <StatusBar backgroundColor={'#166cbf'} />
            <View
                style={{
                    height: 150,
                    width: '100%',
                    backgroundColor: '#2b8be7',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('./app/images/masjid.jpg')}
                    style={{ height: 150, width: '100%', opacity: 0.3 }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        marginLeft: 16,
                        color: 'white',
                        fontSize: 21,
                        fontWeight: 'bold',
                    }}>
                    {'Hello, Rachma Adzima'}
                </Text>
            </View>
            {renderJadwalSholat('Shubuh', sholatTiming.Fajr)}
            {renderJadwalSholat('Dzuhur', sholatTiming.Dhuhr)}
            {renderJadwalSholat('Ashar', sholatTiming.Asr)}
            {renderJadwalSholat('Maghrib', sholatTiming.Maghrib)}
            {renderJadwalSholat('Isya', sholatTiming.Isha)}
            <Text
                style={{ marginTop: 32, color: 'gray', fontWeight: 'bold' }}>
                {'Ayo lekas sholat, jangan tunda sholat mu !'}
            </Text>
        </View>
    );
};
 
export default Home;