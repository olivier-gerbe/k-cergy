<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:param name="lang">fr</xsl:param>
	<xsl:template match="/">
		<portfolio owner="Y">
			<version>4</version>
			<asmRoot delete="Y" read="Y" role="" submit="Y" write="Y" xsi_type="">
				<metadata-wad menuroles="PPN-parts,activite,Ajouter un groupe,redacteur;PPN-parts,IUT2-departement,Ajouter le département,redacteur" />
				<metadata-epm />
				<metadata public="Y" sharedNode="N" sharedNodeResource="N" />
				<asmResource xsi_type="nodeRes">
					<code>PPN_XXX</code>
					<label lang="fr">_PPN_XX</label>
					<label lang="en">_PPN_XX</label>
				</asmResource>
				<asmResource xsi_type="context">
					<text lang="fr" />
					<text lang="en" />
				</asmResource>
				<xsl:for-each select="//nouveau-groupe">
					<xsl:variable name="group"><xsl:value-of select="."/></xsl:variable>
						<asmUnit delete="Y" read="Y" role="" submit="Y" write="Y" xsi_type="asmUnit">
							<metadata-wad delnoderoles="redacteur" editnoderoles="redacteur"
							menuroles="PPN-parts,competence-metier,Ajouter une compétence métier/,redacteur;PPN-parts,competence-trans,Ajouter une compétence transversale,redacteur;PPN-parts,module-liste,Ajouter les modules,redacteur"
							seenoderoles="all" />
							<metadata-epm />
							<metadata multilingual-node="Y" semantictag="activite" sharedNode="N" sharedNodeResource="N" />
							<asmResource xsi_type="nodeRes">
								<code><xsl:value-of select="."/></code>
								<label lang="fr"><xsl:value-of select="../groupe"/></label>
								<label lang="en"></label>
							</asmResource>
							<asmResource xsi_type="context">
								<text lang="fr" />
								<text lang="en" />
							</asmResource>
							<!-- ============================================== -->
							<xsl:for-each select="//record[code-groupe=$group and code-competence]">					
								<asmUnitStructure delete="Y" read="Y" role="" submit="Y" write="Y" xsi_type="asmUnitStructure">
									<metadata-wad delnoderoles="redacteur" editnoderoles="redacteur" seenoderoles="all" />
									<metadata-epm />
									<metadata multilingual-node="Y" semantictag="competence-metier" sharedNode="N" sharedNodeResource="N" />
									<asmResource xsi_type="nodeRes">
										<code><xsl:value-of select="code-competence"/></code>
										<label lang="fr"><xsl:value-of select="competence"/></label>
										<label lang="en"></label>
									</asmResource>
									<asmResource xsi_type="context">
										<text lang="fr" />
										<text lang="en" />
									</asmResource>
								</asmUnitStructure>
							</xsl:for-each>
							<!-- ============================================== -->
							<asmUnitStructure delete="Y" read="Y" role="" submit="Y" write="Y" xsi_type="asmUnitStructure">
								<metadata-wad menuroles="PPN-parts,module-groupe,Ajouter un module,redacteur" seenoderoles="all" />
								<metadata-epm />
								<metadata multilingual-node="Y" semantictag="module-liste" sharedNode="N" sharedNodeResource="N" />
								<asmResource xsi_type="nodeRes">
									<code />
									<label lang="fr">Modules donnant le groupe de compétences <xsl:value-of select="$group"/></label>
									<label lang="en">Modules giving the group of competencies <xsl:value-of select="$group"/></label>
								</asmResource>
								<asmResource xsi_type="context">
									<text lang="fr" />
									<text lang="en" />
								</asmResource>
								<xsl:for-each select="//record[code-groupe=$group and code-module]">
									<asmContext delete="Y" read="Y" role="" submit="Y" write="Y" xsi_type="asmContext">
										<metadata-wad seenoderoles="all" />
										<metadata-epm />
										<metadata multilingual-node="Y" multilingual-resource="Y" semantictag="module-groupe" sharedNode="N" sharedNodeResource="N" sharedResource="N" />
										<asmResource xsi_type="nodeRes">
											<code />
											<text lang="fr" />
											<text lang="en" />
										</asmResource>
										<asmResource xsi_type="context">
											<text lang="fr" />
											<text lang="en" />
										</asmResource>
										<asmResource xsi_type="Item">
											<code><xsl:value-of select="code-module"/></code>
											<label lang="fr"><xsl:value-of select="module"/></label>
											<label lang="en"></label>
										</asmResource>
									</asmContext>
								</xsl:for-each>
								</asmUnitStructure>
							<!-- ============================================== -->
						</asmUnit>
				</xsl:for-each>
			</asmRoot>
		</portfolio>
	</xsl:template>
</xsl:stylesheet>