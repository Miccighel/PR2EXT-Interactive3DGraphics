function animate() {
    controls.update();
    wakeUpCamera();
    onWindowResize();
    requestAnimationFrame(animate);
    TWEEN.update();
}

function render() {
    renderer.render(scene, camera);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
}

// This functions keep the proportions of the rendered scene on window resize

function onWindowResize(){
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

/* This function moves the camera, because when new data are generated and a new is made; to view the changes, the camera has to
 move.*/

function wakeUpCamera() {
    camera.position.x+=0.0000000001;
}

// This function shows an intro text with the instructions to use the application

function showIntroText() {

    var introText, introText2, introText3, introText4, introText5, introText6, introTextGeometry, introTextGeometry2,
        introTextGeometry3, introTextGeometry4, introTextGeometry5, introTextGeometry6, introTextMaterial, text, text2, text3,
        text4, text5, text6;

    scene = new THREE.Scene();

    introText = "Instructions: 1) Select a type of chart. After that, more controls will be shown.";
    introText2 = "2) You can choose between colors or materials.";
    introText3 = "3) Edit data.";
    introText4 = "4) You can highlight data by clicking over it";
    introText5 = "5) You can remove the highlight by clicking the reset button";
    introText6 = "Made by: Soprano Michael - Perazza Giuliano";

    introTextGeometry = new THREE.TextGeometry( introText, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextGeometry2 = new THREE.TextGeometry( introText2, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextGeometry3 = new THREE.TextGeometry( introText3, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextGeometry4 = new THREE.TextGeometry( introText4, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextGeometry5 = new THREE.TextGeometry( introText5, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextGeometry6 = new THREE.TextGeometry( introText6, {size: 6.3,height: 0.5,curveSegments:2,font: "helvetiker"});
    introTextMaterial = new THREE.MeshBasicMaterial( { color: 0xF52BA, overdraw: true } );

    text = new THREE.Mesh( introTextGeometry, introTextMaterial );
    text2 = new THREE.Mesh( introTextGeometry2, introTextMaterial );
    text3 = new THREE.Mesh( introTextGeometry3, introTextMaterial );
    text4 = new THREE.Mesh( introTextGeometry4, introTextMaterial );
    text5 = new THREE.Mesh( introTextGeometry5, introTextMaterial );
    text6 = new THREE.Mesh( introTextGeometry6, introTextMaterial );

    text.position.x = -152;
    text2.position.y = -10;
    text2.position.x = -103;
    text3.position.y = -20;
    text3.position.x = -103;
    text4.position.y = -30;
    text4.position.x = -103;
    text5.position.y = -40;
    text5.position.x = -103;
    text6.position.y = -60;
    text6.position.x = -152;

    rowsNumber.onChange(function(value) {
        showIntroText();
    });

    columnsNumber.onChange(function(value) {
        showIntroText();
    });

    maxValue.onChange(function(value) {
        showIntroText();
    });

    scene.add(text);
    scene.add(text2);
    scene.add(text3);
    scene.add(text4);
    scene.add(text5);
    scene.add(text6);

    camera.position.z = 100;
}

/* DATA SETUP FUNCTIONS */

// This function generates a matrix of random integers to use as data for the graphs

function generateData(rowNumb , colNumb, min, max) {

    var data = new Array();
    var tempArray;

    for(var i=0;i<rowNumb;i++){
        tempArray = new Array();
        for (var j=0;j<colNumb;j++) {
            // The random values are rounded to the second decimal digit
            tempArray.push((Math.round((Math.random() * (max - min) + min)*100)/100));
        }
        data.push(tempArray);
    }
    return data;
}

/* MATERIAL SETUP FUNCTIONS */

// This function loads the selected material set within the selected type of chart

function loadChartMaterial() {

    scene = new THREE.Scene();

    visualSet.onChange(function(value) {
        switch (params.Visual_Set) {
            // If the first color set is chosen
            case 'Color Set 1':
                visuals = new Array();
                visuals.push('#00ff00');
                visuals.push('#ffff00');
                visuals.push('#FF0049');
                visuals.push('#0E28E8');
                visuals.push('#4B0082');
                visuals.push('#30D5C8');
                break;
            // If the second color set is chosen
            case 'Color Set 2':
                visuals = new Array();
                visuals.push('#0F52BA');
                visuals.push('#FF6600');
                visuals.push('#ffd800');
                visuals.push('#C0007F');
                visuals.push('#FF0000');
                visuals.push('#410012');
                break;
            // If the first material set is chosen
            case 'Material Set 1':
                visuals = new Array();
                visuals.push('#00ff00');
                visuals.push('#ffff00');
                visuals.push('#FF0049');
                visuals.push('#0E28E8');
                visuals.push('#4B0082');
                visuals.push('#30D5C8');
                // The textures for the planes are loaded
                var planeParams = {
                    map: 'textures/metaldiffuse.jpg',
                    specularMap: 'textures/metalspecular.jpg',
                }
                visuals.push(planeParams);
                break;
            // If the second material set is chosen
            case 'Material Set 2':
                visuals = new Array();
                visuals.push('#0F52BA');
                visuals.push('#FF6600');
                visuals.push('#ffd800');
                visuals.push('#C0007F');
                visuals.push('#FF0000');
                visuals.push('#410012');
                // The textures for the planes are loaded
                var planeParams = {
                    map: 'textures/metaldiffuse.jpg',
                    specularMap: 'textures/metalspecular.jpg',
                }
                visuals.push(planeParams);
                break;
        }
        switch (params.Chart){
            case 'Pie Chart':
                showPieChart();
                break;
            case 'Bar Chart':
                showBarChart();
                break;
            case 'Area Chart':
                showAreaChart();
                break;
        }
    });
    // Now, visuals is an array that contains the material of the chosen set.
}

// This function loads the highlight feature for the graphs.

function loadHighlight() {

    var raycaster, intersects, intersectedMesh, chart;

    projector = new THREE.Projector();
    mouseVector = new THREE.Vector3();

    // Window listener to detect mouse click.
    window.addEventListener( 'click', onMouseClick, false );

    function onMouseClick( e ) {

        // The mouse coordinates are obtained.
        mouseVector.x = 2 * (e.clientX / window.innerWidth) - 1;
        mouseVector.y = 1 - 2 * ( e.clientY / window.innerHeight );

        // Here a ray that goes from the camera to the mouse coordinates is made.
        raycaster = projector.pickingRay( mouseVector.clone(), camera );
        // Here we get the meshes intersected by the ray.
        intersects = raycaster.intersectObjects( chartMesh.children );

        // If there are intersected meshes.
        if(intersects.length>0) {

            // We get the nearest mesh. That array goes from 0..n, the n-th mesh is furthest.
            intersectedMesh = intersects[ 0 ];

            chart = intersectedMesh.object;

            // When a data of the chart is selected, a label containing the value of the chart element is created  .
            switch(chart['type']){
                case 'pieChart':
                    // The text of label is made by the value of the data and a percentual (2 digits).
                    valueLabelText = ''+chart['value']+' ('+((chart['value']*100)/chart['sumValue']).toFixed(2)+" %)";
                    valueLabelGeometry = new THREE.TextGeometry( valueLabelText, {size: 1.5,height: 0.1,curveSegments:2,font: "helvetiker"});
                    valueLabelMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
                    valueLabel = new THREE.Mesh( valueLabelGeometry, valueLabelMaterial );
                    chart.add(valueLabel);
                    // If the chart row showed has more than 1 element, the labels are positioned at the half of the slice.
                    if(params.Columns > 1){
                        // Some adjustements to the position are made.
                        valueLabel.position.x = (Math.cos(chart['grades']/2)*chart['ray']) + 1;
                        valueLabel.position.z = (Math.sin(chart['grades']/2)*chart['ray']) + 1;
                        valueLabel.position.y = 0.3;
                        valueLabel.rotation.y = -chart['grades']/2;
                    } else {
                        // The label is put over the chart.
                        valueLabel.position.y = 2.3;
                        valueLabel.position.x = -1;
                    }

                    switch(params.Visual_Set){
                        // If the chosen material is Three.js MeshPhongMaterial, the slice is highlighted by making it dull.
                        case 'Material Set 1':
                            chart.material.shininess = 0;
                            break;
                        // If the chosen material is the material with the custom shaders, the slice is highlighted by setting another pair of shaders that handle the highlighting.
                        case 'Material Set 2':
                            vShader = document.getElementById("vertex-highlight").textContent;
                            fShader = document.getElementById("fragment-highlight").textContent;
                            chart.material.vertexShader = vShader;
                            chart.material.fragmentShader = fShader;
                            chart.material.needsUpdate = true;
                            break;
                    }
                    break;

                case 'barChart':
                    valueLabelText = ''+chart['value'];
                    valueLabelGeometry = new THREE.TextGeometry( valueLabelText, {size: 0.6,height: 0.1,curveSegments:2,font: "helvetiker"});
                    valueLabelMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
                    valueLabel = new THREE.Mesh( valueLabelGeometry, valueLabelMaterial );
                    chart.add(valueLabel);
                    // The label is put over the bar
                    valueLabel.position.y = 0.5 + 1/(12*chart['value']);
                    // Some adjustements to the position are made if the value of the bar is a number between 0 and 9
                    if(chart['value']<10) {
                        valueLabel.position.x = -0.75;
                    } else{
                        valueLabel.position.x = -1;
                    }
                    valueLabel.scale.y = 1/chart['value'];

                    // The following code is the same as for the pie chart
                    switch(params.Visual_Set){
                        case 'Material Set 1':
                            chart.material.shininess = 0;
                            break;
                        case 'Material Set 2':
                            vShader = document.getElementById("vertex-highlight").textContent;
                            fShader = document.getElementById("fragment-highlight").textContent;
                            chart.material.vertexShader = vShader;
                            chart.material.fragmentShader = fShader;
                            chart.material.needsUpdate = true;
                            break;
                    }
                    break;

                case 'areaChart':
                    for(var i = 0; i < params.Columns;i++){
                        valueLabelText = ''+chart['value'+i];
                        valueLabelGeometry = new THREE.TextGeometry( valueLabelText, {size: 0.4,height: 0.1,curveSegments:2,font: "helvetiker"});
                        valueLabelMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: true } );
                        valueLabel = new THREE.Mesh( valueLabelGeometry, valueLabelMaterial );
                        chart.add(valueLabel);
                        // The labels are put over the max value of the selected row
                        valueLabel.position.y = chart['rowMaxValue'];
                        valueLabel.position.z = i*2;
                        if(chart['value'+i]<10){
                            valueLabel.position.x = chart['row']*2-0.75;
                        } else {
                            valueLabel.position.x = chart['row']*2-1;
                        }
                    }
                    // The following code is the same as for the pie chart
                    switch(params.Visual_Set){
                        case 'Material Set 1':
                            chart.material.shininess = 0;
                            break;
                        case 'Material Set 2':
                            vShader = document.getElementById("vertex-highlight").textContent;
                            fShader = document.getElementById("fragment-highlight").textContent;
                            chart.material.vertexShader = vShader;
                            chart.material.fragmentShader = fShader;
                            chart.material.needsUpdate = true;
                            break;
                    }
                    break;
            }
            // If it's highlighted (this happens when a color only set is chosen)
            if(chart.material.opacity==0.65){
                chart.material.opacity = 1;
            }
        }
    }
}

/* PLANE SETUP FUNCTIONS */

// This function generates three planes centered in (0,0,0) point.

function generatePlanes(data,maxValue) {

    var planeXYGeometry, planeXYMesh, planeMaterial, planeXZMaterial;
    var planeXZGeometry, planeXZMesh;
    var planeYZGeometry, planeYZMesh;
    var planeXZ, planeYZ, planeXY;

    /* If the visual set has more than 6 colors, it means that a texture is available to be loaded for the planes;
    this happens when a material set is chosen.*/
    if(visuals.length==7) {
        // Plane textures handling
        var planeParams = visuals[6];
        var map = THREE.ImageUtils.loadTexture(planeParams.map);
        var specularMap = THREE.ImageUtils.loadTexture(planeParams.specularMap);

        map.wrapT = THREE.RepeatWrapping;
        map.wrapS = THREE.RepeatWrapping;

        specularMap.wrapT = THREE.RepeatWrapping;
        specularMap.wrapS = THREE.RepeatWrapping;

        // If the pie chart is chosen, the number of repeats of the texture is fixed
        if(params.Chart == 'Pie Chart'){
            map.repeat.set( 6, 6);
            specularMap.repeat.set( 6, 6);
        } else {
            map.repeat.set( params.Rows, params.Columns );
            specularMap.repeat.set( params.Rows, params.Columns );
        }

        planeMaterial = new THREE.MeshPhongMaterial({map:map, specularMap:specularMap, side:THREE.DoubleSide});
        planeXZMaterial = new THREE.MeshPhongMaterial({map:map, specularMap:specularMap, side:THREE.DoubleSide});
    } else {
        //When a color set only is chosen, the material is created with the color of the color set assigned to the current row
        planeMaterial = new THREE.MeshBasicMaterial({color:0xa0a0a0,side:THREE.DoubleSide,opacity:0.65,transparent: true});
        planeXZMaterial = new THREE.MeshBasicMaterial({color:0x808080,side:THREE.DoubleSide});
    }

    // With the bar or area chart three planes are made
    if(params.Chart == 'Area Chart' || params.Chart == 'Bar Chart'){
        // XY PLANE : Width = Row Number, Height: Max Value
        planeXYGeometry = new THREE.PlaneGeometry(data.length*2,maxValue);
        planeXYMesh = new  THREE.Mesh(planeXYGeometry,planeMaterial);

        // XZ PLANE: Width = Row Number, Height: Column Number
        planeXZGeometry = new THREE.PlaneGeometry(data.length*2,data[0].length*2);
        planeXZMesh = new  THREE.Mesh(planeXZGeometry,planeXZMaterial);

        // YZ PLANE: Width = Column Number, Height: Max Value
        planeYZGeometry = new THREE.PlaneGeometry(data[0].length*2,maxValue);
        planeYZMesh = new  THREE.Mesh(planeYZGeometry,planeMaterial);

        // There are some roto-translations that are applied to the planes

        planeXYMesh.position.x = (data.length);
        planeXYMesh.position.y = maxValue/2;
        planeXZMesh.rotation.x = -90*Math.PI/180;
        planeXZMesh.position.x = (data.length);
        planeXZMesh.position.z = (data[0].length);
        planeYZMesh.rotation.y = 90*Math.PI/180;
        planeYZMesh.position.y = maxValue/2;
        planeYZMesh.position.z = data[0].length;

        // We allow the planes to receive the shadows casted by the elements of the chart
        planeXYMesh.receiveShadow = true;
        planeXZMesh.receiveShadow = true;
        planeYZMesh.receiveShadow = true;

        planeXZ = new THREE.Object3D();
        planeXZ.add(planeXZMesh);
        planeXY = new THREE.Object3D();
        planeXY.add(planeXYMesh);
        planeYZ = new THREE.Object3D();
        planeYZ.add(planeYZMesh);

        // The labels on the z axis of the XZ plane are made
        for(var i=0;i<params.Columns;i++){
            columnLabelText = 'Column '+(i+1);
            columnLabelGeometry = new THREE.TextGeometry( columnLabelText, {size: 1,height: 0.1,curveSegments:2,font: "helvetiker"});
            columnLabelMaterial = new THREE.MeshBasicMaterial( { color: 0xF52BA, overdraw: true } );
            columnLabel = new THREE.Mesh( columnLabelGeometry, columnLabelMaterial );
            columnLabel.rotation.x = -90*Math.PI/180;
            columnLabel.position.x = (params.Rows+0.15)*2;
            columnLabel.position.z = (i + 0.75)*2;
            planeXZ.add(columnLabel);
        }

        // The labels on the x axis of the XZ plane are made
        for(var i=0;i<params.Rows;i++){
            rowsLabelText = 'Row '+(i+1);
            rowsLabelGeometry = new THREE.TextGeometry( rowsLabelText, {size: 1,height: 0.1,curveSegments:2,font: "helvetiker"});
            rowsLabelMaterial = new THREE.MeshBasicMaterial( { color: 0xF52BA, overdraw: true } );
            rowsLabel = new THREE.Mesh( rowsLabelGeometry, rowsLabelMaterial );
            rowsLabel.rotation.x = -90*Math.PI/180;
            rowsLabel.rotation.z = 90*Math.PI/180;
            rowsLabel.position.z = (params.Columns+2.25)*2;
            rowsLabel.position.x = (i + 0.75)*2;
            planeXZ.add(rowsLabel);
        }

        // The labels on the y axis of the YZ plane are made
        for(var i=0;i<=params.Max_Value;i=i+2){
            valueLabelText = ''+(i);
            valueLabelGeometry = new THREE.TextGeometry( valueLabelText, {size: 0.8,height: 0.1,curveSegments:2,font: "helvetiker"});
            valueLabelMaterial = new THREE.MeshBasicMaterial( { color: 0xF52BA, overdraw: true } );
            valueLabel = new THREE.Mesh( valueLabelGeometry, valueLabelMaterial );
            valueLabel.position.y = i-0.8;
            if(i < 10) {
                valueLabel.position.x = -0.725;
            } else {
                valueLabel.position.x = -1.45;
            }
            valueLabel.position.z = (params.Columns)*2;
            planeYZ.add(valueLabel);
        }

        scene.add(planeXY);
        scene.add(planeYZ);
        scene.add(planeXZ);

    } else if(params.Chart == 'Pie Chart'){
        // If the chosen chart is the pie, only one plane is made
        planeXZGeometry = new THREE.PlaneGeometry(80,80);
        planeXZMesh = new  THREE.Mesh(planeXZGeometry,planeXZMaterial);
        planeXZMesh.rotation.x = -90*Math.PI/180;
        planeXZMesh.position.y = -0.1;
        // Also this plane can receive the shadows
        planeXZMesh.receiveShadow = true;
        scene.add(planeXZMesh);
    }
}

/* PIE CHART FUNCTIONS */

/* This function generates a pie chart mesh. It takes as input the random data generated,
 the color set chosen from the user, and the row tho show */

function generatePieChart(data, visualSet, rowToShow) {

    var pieGeometry, pieMaterial, chartMesh, chart, pVertices, tot, sumRotation, ray, sumVertices;

    generatePlanes(data,maxValue);

    chartMesh = new THREE.Object3D();

    tot = 0;
    sumRotation = 0;
    ray = 14;
    sumVertices = 0;
    pVertices = new Array(params.Columns);

    // Sum all the value of the row to show
    for(var i = 0; i < data[rowToShow-1].length;i++){
        tot += data[rowToShow-1][i];
    }

    // Compute the number of vertices for each slice
    for(var i = 0; i < pVertices.length;i++){
        pVertices[i] = Math.round((data[rowToShow-1][i]*(360))/tot);
        sumVertices += pVertices[i];

        /* If the sum of all slice vertices is greater or lesser than 360°,
         the last slice's number of vertices is reduced or increased*/
        if(i == (pVertices.length - 1) && (sumVertices < 360 || sumVertices > 360)) {
            pVertices[i] = 360 - (sumVertices - pVertices[i]);
        }
    }

    for(var i = 0; i < data[rowToShow-1].length;i++){

        pieGeometry = new THREE.Geometry();

        /* If the visual set has more than 6 colors, it means that a texture is available to be loaded for the planes;
         this happens when a material set is chosen.*/
        if(visualSet.length == 7) {
            if(params.Visual_Set == "Material Set 1"){
                pieMaterial = new THREE.MeshPhongMaterial({ambient: 0x030303, color: visualSet[i], specular: 0xffffff, shininess: 10, shading: THREE.SmoothShading } );
            } else if(params.Visual_Set == "Material Set 2") {
                vShader = document.getElementById("vertex").textContent;
                fShader = document.getElementById("fragment").textContent;
                attributes = {
                    kDr:	{ type: "f", value: []},
                    kDg:	{ type: "f", value: []},
                    kDb:	{ type: "f", value: []}
                };
                pieMaterial = new THREE.ShaderMaterial({ attributes: attributes, uniforms: uniforms, vertexShader: vShader, fragmentShader: fShader });
            }
        } else {
            //When a color set only is chosen, the material is created with the color of the color set assigned to the current row
            pieMaterial = new THREE.MeshBasicMaterial({color:visualSet[i], side:THREE.FrontSide, opacity: 0.65,transparent: true});
        }

        // Central vertices are pushed in the geometry
        pieGeometry.vertices.push( new THREE.Vector3(0,2,0));
        pieGeometry.vertices.push( new THREE.Vector3(0,0,0));

        for(var j=0;j<=pVertices[i];j++){
            // The vertices along the circumference are pushed in the geometry
            pieGeometry.vertices.push( new THREE.Vector3( Math.cos(j*Math.PI/180)*ray, 2, Math.sin(j*Math.PI/180)*ray));
            pieGeometry.vertices.push( new THREE.Vector3( Math.cos(j*Math.PI/180)*ray, 0, Math.sin(j*Math.PI/180)*ray));
        }

        for(var j=2;j< pieGeometry.vertices.length-2;j= j+2){
            // Top faces are created
            pieGeometry.faces.push( new THREE.Face3( 0, j+2, j ));
            // Bottom faces are created
            pieGeometry.faces.push( new THREE.Face3( 1, j+1, j+3));
            // Lateral faces are created
            pieGeometry.faces.push( new THREE.Face3( j+1,j, j+2));
            pieGeometry.faces.push( new THREE.Face3( j+2, j+3, j+1));
        }

        pieGeometry.computeFaceNormals();
        pieGeometry.computeVertexNormals();

        chart = new THREE.Mesh(pieGeometry,pieMaterial);

        if(params.Visual_Set == "Material Set 2") {
            var vertices = chart.geometry.vertices;
            // The hexadecimal color is changed in its rgb components
            var r = hexToR(visualSet[i]);
            var g = hexToG(visualSet[i]);
            var b = hexToB(visualSet[i]);
            // The vertex shader takes the three components to make the diffuse color of the surface
            for(var v = 0; v < vertices.length; v++) {
                attributes.kDr.value.push(r/255);
                attributes.kDg.value.push(g/255);
                attributes.kDb.value.push(b/255);
            }
        }

        // Some attributes are made to handle the positioning of the chart labels
        chart['ray']=14;
        chart['grades']= (pVertices[i])*Math.PI/180;
        chart['value']=data[rowToShow-1][i];
        chart['type']='pieChart';
        chart['sumValue']=tot;

        if(params.Visual_Set == 'Color Set 1' || params.Visual_Set == 'Color Set 2'){
            chart.castShadow = false;
            chart.receiveShadow =false;
        } else {
            // The chart can cast shadows only if a material set is chosen
            chart.castShadow = true;
            chart.receiveShadow = true;
        }

        // Sum the grades of the i-th slice
        sumRotation += (pVertices[i])*Math.PI/180;

        chart.rotation.y = sumRotation;
        chartMesh.add(chart);
    }
    // Finally, the mesh is ready to be shown
    return chartMesh;
}
// This function updates the pie chart if there are changes in the GUI.

function showPieChart() {

    /* PIE CHART SETUP */

    scene = new THREE.Scene();

    // If the number of rows changes, a new matrix is calculated
    rowsNumber.onChange(function(value) {
        // Row to show param should not be greater than the number of rows.
        rowToShow.max(params.Rows);
        // The old data are deleted
        data = new Array();
        // New data are made
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene()
        // Four white lights are made
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        // The pie mesh for the data is ready
        chartMesh = generatePieChart(data,visuals,params.Row_To_Show);
        animatePieChart(chartMesh);
    });

    // The key idea is the same as the row number
    columnsNumber.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generatePieChart(data,visuals,params.Row_To_Show);
        animatePieChart(chartMesh);
    });

    // The key idea is the same as the row number
    maxValue.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generatePieChart(data,visuals,params.Row_To_Show);
        animatePieChart(chartMesh);
    });

    // If the aren't changes the pie chart is loaded with default data
    generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
    chartMesh = generatePieChart(data,visuals,params.Row_To_Show);
    animatePieChart(chartMesh);

    // If the row to show changes, there's no need to create data matrix again.
    rowToShow.onChange(function(value) {
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generatePieChart(data,visuals,params.Row_To_Show);
        scene.add(chartMesh);
    });
}

// This function animates the pie chart by scaling it in a certain amout of time.

function animatePieChart(chart) {
    var scale = { x : 0.01, z: 0.01};
    var target = { x : 1, z: 1};
    var tween = new TWEEN.Tween(scale).to(target, 2500);
    tween.onUpdate(function(){
        chart.scale.x = scale.x;
        chart.scale.z = scale.z;
        scene.add(chartMesh);
    });
    // An exponential spline is used
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start();
}

/* BAR CHART FUNCTIONS */

/* This function generates a bar chart mesh with xy, xz, yz planes. It takes as input the random data generated,
 the color set chosen from the user, and the max value of data matrix */

function generateBarChart(data, visualSet, maxValue) {

    var barGeometry, barMaterial, chart, chartMesh;

    // Planes for the graph are loaded
    generatePlanes(data,maxValue);

    chartMesh = new THREE.Object3D();

    for(var i=0;i<data.length;i++){

        for(var j=0;j<data[i].length;j++){

            barGeometry = new THREE.BoxGeometry(0.5,1,0.5);

            // The key idea is the same as the pie chart
            if(visualSet.length == 7) {
                if(params.Visual_Set == "Material Set 1"){
                    barMaterial = new THREE.MeshPhongMaterial({ambient: 0x030303, color: visualSet[i], specular: 0xffffff, shininess: 10, shading: THREE.SmoothShading } );
                } else if(params.Visual_Set == "Material Set 2") {
                    vShader = document.getElementById("vertex").textContent;
                    fShader = document.getElementById("fragment").textContent;
                    attributes = {
                        kDr:	{ type: "f", value: []},
                        kDg:	{ type: "f", value: []},
                        kDb:	{ type: "f", value: []}
                    };
                    barMaterial = new THREE.ShaderMaterial({ attributes: attributes, uniforms: uniforms, vertexShader: vShader, fragmentShader: fShader });
                }
            } else {
                // When a color set only is chosen, the material is created with the color of the color set assigned to the current row
                barMaterial = new THREE.MeshBasicMaterial({color:visualSet[i], side:THREE.FrontSide, opacity: 0.65,transparent: true});
            }

            chart = new THREE.Mesh(barGeometry,barMaterial);

            // The hexadecimal color is changed in its rgb components
            if(params.Visual_Set == "Material Set 2") {
                var vertices = chart.geometry.vertices;
                var r = hexToR(visualSet[i]);
                var g = hexToG(visualSet[i]);
                var b = hexToB(visualSet[i]);
                // The vertex shader takes the three components to make the diffuse color of the surface
                for(var v = 0; v < vertices.length; v++) {
                    attributes.kDr.value.push(r/255);
                    attributes.kDg.value.push(g/255);
                    attributes.kDb.value.push(b/255);
                }
            }

            // Some attributes are made to handle the positioning of the chart labels
            chart['value']=data[i][j];
            chart['type']='barChart';

            chart.position.z = j*2+1;
            chart.position.x = i*2+1;
            chart.position.y = data[i][j]/2 + 0.005;
            chart.scale.y = data[i][j];

            if(params.Visual_Set == 'Color Set 1' || params.Visual_Set == 'Color Set 2'){
                chart.castShadow = false;
                chart.receiveShadow =false;
            } else {
                chart.castShadow = true;
                chart.receiveShadow = true;
            }

            chartMesh.add(chart);
        }
    }

    return chartMesh;
}

function showBarChart() {

    /* BAR CHART SETUP */

    scene = new THREE.Scene();

    // If the number of rows changes, a new matrix is calculated
    rowsNumber.onChange(function(value) {
        // The old data are deleted
        data = new Array();
        // New data are made
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        // Four white lights are made
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        // The bar mesh for the data is ready
        chartMesh = generateBarChart(data,visuals,params.Max_Value);
        animateBarChart(chartMesh);
    });

    // The key idea is the same as the row number
    columnsNumber.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generateBarChart(data,visuals,params.Max_Value);
        animateBarChart(chartMesh);
    });

    // The key idea is the same as the row number
    maxValue.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generateBarChart(data,visuals,params.Max_Value);
        animateBarChart(chartMesh);
    });

    // If the aren't changes the bar chart is loaded with default data
    chartMesh = generateBarChart(data,visuals,params.Max_Value);
    generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
    animateBarChart(chartMesh);
    scene.add(chartMesh);
}

// This function animates the pie chart by scaling it in a certain amout of time.

function animateBarChart(chart) {
    var scale = { y : 0.01};
    var target = { y : 1};
    var tween = new TWEEN.Tween(scale).to(target, 2500);
    tween.onUpdate(function(){
        chart.scale.y = scale.y;
        scene.add(chartMesh);
    });
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start();
}

/* AREA CHART FUNCTIONS */

/* This function generates an area chart mesh with xy, xz, yz planes. It takes as input the random data generated,
 the color set chosen from the user, and the max value of data matrix */

function generateAreaChart(data, visualSet, maxValue) {

    var areaGeometry, areaMaterial, chartMesh, chart;

    // Planes for the graph are loaded
    generatePlanes(data,maxValue);

    chartMesh = new THREE.Object3D();

    for(var i=0;i<data.length;i++){

        // The key idea is the same as the pie chart
        if(visualSet.length == 7) {
            if(params.Visual_Set == "Material Set 1"){
                areaMaterial = new THREE.MeshPhongMaterial({ambient: 0x030303, color: visualSet[i], specular: 0xffffff, shininess: 10, shading: THREE.SmoothShading } );
            } else if(params.Visual_Set == "Material Set 2") {
                vShader = document.getElementById("vertex").textContent;
                fShader = document.getElementById("fragment").textContent;
                attributes = {
                    kDr:	{ type: "f", value: []},
                    kDg:	{ type: "f", value: []},
                    kDb:	{ type: "f", value: []}
                };
                areaMaterial = new THREE.ShaderMaterial({ attributes: attributes, uniforms: uniforms, vertexShader: vShader, fragmentShader: fShader });
            }
        } else {
            // When a color set only is chosen, the material is created with the color of the color set assigned to the current row
            areaMaterial = new THREE.MeshBasicMaterial({color:visualSet[i], side:THREE.FrontSide, opacity: 0.65,transparent: true});
        }

        areaGeometry = new THREE.Geometry();
        for(var j=0;j<data[i].length;j++){
            // Here the vertices for the front face are pushed
            areaGeometry.vertices.push(new THREE.Vector3(i*2,data[i][j],j*2));
            areaGeometry.vertices.push(new THREE.Vector3(i*2,0,j*2));
        }
        for(var j=data[i].length-1;j>=0;j--){
            // Here the vertices for the back face are pushed
            areaGeometry.vertices.push(new THREE.Vector3(i*2-0.5,data[i][j],j*2));
            areaGeometry.vertices.push(new THREE.Vector3(i*2-0.5,0,j*2));
        }

        for(var k=0;k<areaGeometry.vertices.length-2;k= k+2){
            // Here the front and back faces of the area chart are made
            areaGeometry.faces.push(new THREE.Face3(k+2,k+1,k));
            areaGeometry.faces.push(new THREE.Face3(k+3,k+1,k+2));
            // Here the top face of the area chart is made
            areaGeometry.faces.push(new THREE.Face3(areaGeometry.vertices.length-2-k,k+2,k));
        }
        // Here the first triangle of the last lateral face is made
        areaGeometry.faces.push(new THREE.Face3(0,areaGeometry.vertices.length -1,areaGeometry.vertices.length -2));
        // Here the second triangle of the last lateral face is made
        areaGeometry.faces.push(new THREE.Face3(1,areaGeometry.vertices.length -1,0));

        areaGeometry.computeFaceNormals();
        areaGeometry.computeVertexNormals();

        chart = new THREE.Mesh(areaGeometry,areaMaterial);

        // The hexadecimal color is changed in its rgb components
        if(params.Visual_Set == "Material Set 2") {
            var vertices = chart.geometry.vertices;
            var r = hexToR(visualSet[i]);
            var g = hexToG(visualSet[i]);
            var b = hexToB(visualSet[i]);
            // The vertex shader takes the three components to make the diffuse color of the surface.
            for(var v = 0; v < vertices.length; v++) {
                attributes.kDr.value.push(r/255);
                attributes.kDg.value.push(g/255);
                attributes.kDb.value.push(b/255);
            }
        }

        // Some attributes are made to handle the positioning of the chart labels
        var max = 0;
        for(var j= 0; j < data[i].length; j++){
            max = Math.max(max,data[i][j]);
            chart['value'+j] = data[i][j];
        }
        chart['row'] = i;
        chart['rowMaxValue']=max;
        chart['type'] = 'areaChart';
        chart.position.x = 1.2;
        chart.position.z = 1.2;

        if(params.Visual_Set == 'Color Set 1' || params.Visual_Set == 'Color Set 2'){
            chart.castShadow = false;
            chart.receiveShadow =false;
        } else {
            chart.castShadow = true;
            chart.receiveShadow = true;
        }

        chartMesh.add(chart);
    }
    return chartMesh;
}

function showAreaChart() {

    /* AREA CHART SETUP */

    scene = new THREE.Scene();

    // If the number of rows changes, a new matrix is calculated
    rowsNumber.onChange(function(value) {
        // The old data are deleted
        data = new Array();
        // New data are made
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        // Four white lights are made
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        // The area mesh for the data is ready
        chartMesh = generateAreaChart(data,visuals,params.Max_Value);
        animateAreaChart(chartMesh);
    });

    // The key idea is the same as the row number
    columnsNumber.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generateAreaChart(data,visuals,params.Max_Value);
        animateAreaChart(chartMesh);
    });

    // The key idea is the same as the row number
    maxValue.onChange(function(value) {
        data = new Array();
        data = generateData(params.Rows, params.Columns,1,params.Max_Value);
        scene = new THREE.Scene();
        generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
        chartMesh = generateAreaChart(data,visuals,params.Max_Value);
        animateAreaChart(chartMesh);
    });

    // If the aren't changes the area chart is loaded with default data
    generateLights(params.Rows,params.Columns,params.Max_Value,'#FFFFFF',1.2);
    chartMesh = generateAreaChart(data,visuals,params.Max_Value);
    animateAreaChart(chartMesh);
}

// This function animates the pie chart by scaling it in a certain amout of time.

function animateAreaChart(chart) {
    var scale = { y : 0.01};
    var target = { y : 1};
    var tween = new TWEEN.Tween(scale).to(target, 2500);
    tween.onUpdate(function(){
        chart.scale.y = scale.y;
        scene.add(chartMesh);
    });
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.start();
}


// This function generates four lights to light the selected chart

function generateLights(rows,columns,maxValue,color,lightPower) {

    ambientLight = new THREE.AmbientLight(color);

    // The position of spotlights changes in real time, because it's based on the number of rows/columns of the charts, and on the the max value shown.

    spotLight1 = new THREE.SpotLight(color,lightPower,0.0,Math.PI/3,50.0);
    spotLight1.castShadow = true;
    spotLight1.shadowDarkness = 0.3;
    spotLight1.position.set(rows+40.0,(maxValue),columns + 40.0);
    spotLight1.target.position.set(rows,(maxValue/2),columns);

    // The position of the second spotlight changes between charts
    if(params.Chart == 'Pie Chart') {
        spotLight2 = new THREE.SpotLight(color,lightPower,0.0,Math.PI/3,40.0);
        spotLight2.castShadow = true;
        spotLight2.shadowDarkness = 0.3;
        spotLight2.position.set(0,50.0,0);
        spotLight2.target.position.set(0,0,0);
    } else {
        spotLight2 = new THREE.SpotLight(color,lightPower,0.0,Math.PI/3,40.0);
        spotLight2.castShadow = true;
        spotLight2.shadowDarkness = 0.3;
        spotLight2.position.set(rows,(maxValue) + 30.0,columns);
        spotLight2.target.position.set(rows,(maxValue/2),columns);
    }

    spotLight3 = new THREE.SpotLight(color,lightPower,0.0,Math.PI/3,40.0);
    spotLight3.castShadow = true;
    spotLight3.shadowDarkness = 0.3;
    spotLight3.position.set(rows,(maxValue)/2,columns+40.0);
    spotLight3.target.position.set(rows,(maxValue/2),columns);

    // The uniform data for the shaders are set
    uniforms = {
        kS:	{ type: "v3", value:new THREE.Vector3(0.9,0.9,0.9)},
        ambient:	{ type: "v3", value: new THREE.Vector3(0.5,0.5,0.5) },
        pointLightPosition1:	{ type: "v3", value: spotLight1.position},
        pointLightPosition2:	{ type: "v3", value: spotLight2.position},
        pointLightPosition3:	{ type: "v3", value: spotLight3.position},
        lightPower:	{ type: "v3", value: new THREE.Vector3(100000,100000,100000)},
        s: {type: "f", value: 64}
    };
    scene.add(ambientLight);
    scene.add(spotLight1);
    scene.add(spotLight2);
    scene.add(spotLight3);
}

// The following functions convert an hexadecimal color to its rgb components.

function hexToR(h) {
    return parseInt((cutHex(h)).substring(0,2),16);
}
function hexToG(h) {
    return parseInt((cutHex(h)).substring(2,4),16);
}
function hexToB(h) {
    return parseInt((cutHex(h)).substring(4,6),16);
}
function cutHex(h) {
    return (h.charAt(0)=="#") ? h.substring(1,7):h;
}