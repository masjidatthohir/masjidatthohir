document.addEventListener("DOMContentLoaded", function () {
    const prayerTimeApiUrl = "https://api.myquran.com/v2/sholat/jadwal/1225/";

    function fetchPrayerTimes() {
        const date = new Date().toISOString().split('T')[0];
        fetch(`${prayerTimeApiUrl}${date}`)
            .then(response => response.json())
            .then(data => {
                const prayerTimes = data.data.jadwal;
                document.getElementById('subuh-time').textContent = prayerTimes.subuh;
                document.getElementById('dzuhur-time').textContent = prayerTimes.dzuhur;
                document.getElementById('ashar-time').textContent = prayerTimes.ashar;
                document.getElementById('maghrib-time').textContent = prayerTimes.maghrib;
                document.getElementById('isya-time').textContent = prayerTimes.isya;
                startCountdown(prayerTimes);
            })
            .catch(error => console.error('Error fetching prayer times:', error));
    }

    function startCountdown(prayerTimes) {
        function getNextPrayerTime() {
            const now = new Date();
            const times = [
                { name: 'shubuh', time: prayerTimes.subuh },
                { name: 'dzuhur', time: prayerTimes.dzuhur },
                { name: 'ashar', time: prayerTimes.ashar },
                { name: 'maghrib', time: prayerTimes.maghrib },
                { name: 'isya', time: prayerTimes.isya }
            ];

            for (const prayer of times) {
                const [hour, minute] = prayer.time.split(':');
                const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
                if (prayerTime > now) {
                    document.getElementById('next-prayer-name').textContent = `Shalat ${prayer.name.charAt(0).toUpperCase() + prayer.name.slice(1)}`;
                    return prayerTime;
                }
            }
            // If all prayer times are passed, return the first prayer time of the next day
            const [hour, minute] = times[0].time.split(':');
            document.getElementById('next-prayer-name').textContent = `Shalat ${times[0].
                time.charAt(0).toUpperCase() + times[0].name.slice(1)}`;
                return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute);
            }
    
            function updateCountdown() {
                const now = new Date();
                const nextPrayerTime = getNextPrayerTime();
                const timeDifference = nextPrayerTime - now;
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
                document.getElementById('countdown-timer').textContent =
                    `${hours.toString().padStart(2, '0')} jam : ${minutes.toString().padStart(2, '0')} menit : ${seconds.toString().padStart(2, '0')} detik`;
            }
    
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    
        fetchPrayerTimes();
    });
    