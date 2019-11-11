package com.evil.pumpkin;

import com.evil.pumpkin.untils.HttpClientUtil;
import com.evil.pumpkin.untils.InfoUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import oshi.SystemInfo;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.hardware.NetworkIF;
import oshi.software.os.OperatingSystem;

import java.util.*;

@SpringBootApplication
@EnableScheduling
public class EvilPumpkinApplication  {
	private static final Logger logger = LoggerFactory.getLogger(EvilPumpkinApplication.class);
	private static Map<String,List> networkTrafficeMap = new HashMap<>();
	private static List<Long> downloadPackage = new ArrayList<>();

	SystemInfo si = new SystemInfo();
	HardwareAbstractionLayer hardware = si.getHardware();
	OperatingSystem os = si.getOperatingSystem();



	public static void main(String[] args) {

//		reportCurrentStatus();

		SpringApplication.run(EvilPumpkinApplication.class, args);


	}

//	@Scheduled(cron = "0 */5 * * * ?")
	@Scheduled(cron = "0 0 * * *  ?")
	public static void reportCurrentStatus() {
		logger.info("\n\n\n BEGIN --------------> Sending notify to serverchan ........");
		try{
			Map<String, String> map = new HashMap<>();
			map.put("text", InfoUtils.get("currentStatus") + ": " + InfoUtils.getHostname());
			map.put("desp", InfoUtils.getDeviceInfo());

			HttpClientUtil.doPost("https://sc.ftqq.com/SCU48981T4fb6e368a395cf49b26f8bec99fe6cbf5cb93aed4ba36.send", map);

		}catch (Exception e){
			e.printStackTrace();

		}


		logger.info("\n\n\n END --------------> Sending notify to serverchan ........");
	}

	@Scheduled(cron = "0 */1 * * * ?")
	public void reportNetworkTraffic() {

		recordNetworkTraffic(hardware.getNetworkIFs());

	}

	private static void recordNetworkTraffic(NetworkIF[] networkIFs) {
		StringBuilder sb = new StringBuilder();
		if (networkIFs.length == 0) {
			sb.append(" Unknown");
		}
		for (NetworkIF net : networkIFs) {
			if (net.getIPv4addr().length < 1) {
				continue;
			}
			try {
			 	downloadPackage= getDownloadHistoryByInterfaceName(net.getDisplayName());
				long currentDownload=net.getBytesRecv();
				long lastDownload=0;
				if (downloadPackage !=null&& downloadPackage.size()>0 ){
					lastDownload=downloadPackage.get(downloadPackage.size()-1);
					logger.info(net.getDisplayName()+" : "+InfoUtils.getMemorySize( currentDownload-lastDownload)+" /Min");

				}

				if (downloadPackage!=null){
					downloadPackage.add(currentDownload);
					networkTrafficeMap.put(net.getDisplayName(),downloadPackage);
				}


			} catch (Exception e) {
				e.printStackTrace();
			}

		}

	}

	private static long getLastDownByInterfaceName(String name){
		List<Long> downloadPackage= networkTrafficeMap.get(name);
		if (downloadPackage.size()>0){
			return downloadPackage.get(downloadPackage.size()-1);
		}
		return 0;
	}

	private static List<Long> getDownloadHistoryByInterfaceName(String name){
		if (networkTrafficeMap.size()>0){
			return networkTrafficeMap.get(name);
		}

		return new ArrayList<>();
	}



}
