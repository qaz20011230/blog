$maxRetries = 10
$url = "https://liang.world/rss.xml"
$success = $false

for ($i = 1; $i -le $maxRetries; $i++) {
    Write-Host "Checking Vercel deployment... Attempt $i of $maxRetries"
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        if ($response.Content -match "deep-seek-culture-letter") {
            Write-Host "Vercel Deployment is SUCCESSFUL and LIVE!"
            $success = $true
            break
        } else {
            Write-Host "Site not updated yet. Waiting 10 seconds..."
        }
    } catch {
        Write-Host "Request failed. Waiting 10 seconds..."
    }
    Start-Sleep -Seconds 10
}

if (-not $success) {
    Write-Host "Deployment verification timed out."
}
